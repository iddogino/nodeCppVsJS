// hello.cc
#include <node.h>

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::Number;
using v8::Array;
using v8::Exception;

int * bubbleSort(int arr[], int len) {

    // Edge case
    if (len < 2)
        return arr;

    bool sorted = false;

    while (!sorted) {
        sorted = true;

        for (int i = 0; i < len-1; i ++) {
            if(arr[i+1] < arr[i]) {
                int temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                sorted = false;
            }
        }
    }

    return arr;
}

void Sort(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    // Make sure there is an argument.
    if (args.Length() != 1) {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "Need an argument")));
        return;
    }

    // Make sure it's an array.
    if (! args[0]->IsArray()) {
        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "First argument needs to be an array")));
        return;
    }

    Local<Array> inputArrayV8 = Local<Array>::Cast(args[0]);
    unsigned int len = inputArrayV8->Length();

    int arr[len];

    //Copy V8 array into native array
    for (unsigned int i = 0; i < len; i++) {
        arr[i] = inputArrayV8->Get(i)->NumberValue();
    }

    //Sort
    bubbleSort(arr, len);

    // Create a new JS array from the vector.
    Local<Array> result = Array::New(isolate);
    for (unsigned int i = 0; i < len; i++ ) {
        result->Set(i, Number::New(isolate, arr[i]));
    }

    // Return it.
    args.GetReturnValue().Set(result);
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "sort", Sort);
}

NODE_MODULE(cBubbleSort, init)

}  // namespace demo