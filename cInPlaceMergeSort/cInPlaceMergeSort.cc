// hello.cc
#include <node.h>
#include <stdio.h>
#include <cmath>
#include <iostream>

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

int pushToScratch(int * scratch, int i, int val) {
    scratch[i] = val;
    i += 1;
    return i;
}

int * _sort(int arr[], int * scratch, int start, int end) {
    // Recursion tail
    if (start +1 >= end) {
        return arr;
    }

    int pivot = (int) floor((end-start)/2.0)+start;

    arr = _sort(arr, scratch, start, pivot);
    arr = _sort(arr, scratch, pivot, end);

    int l = start;
    int r = pivot;
    int i = 0;

    while (l < pivot || r < end) {
        if (l < pivot && r < end) {
            if (arr[l] < arr[r]) {
                i = pushToScratch(scratch, i, arr[l]);
                l++;
            } else {
                i = pushToScratch(scratch, i, arr[r]);
                r++;
            }
        } else if (l < pivot) {
            i = pushToScratch(scratch, i, arr[l]);
            l++;
        } else if (r < end) {
            i = pushToScratch(scratch, i, arr[r]);
            r++;
        }
    }

    //copy back from scratch to primary
    for (i=0; i < (end-start); i++) {
        arr[i+start] = scratch[i];
    }

    return arr;

}

int * mergeSort(int arr[], int len) {

    // Edge case
    if (len < 2)
        return arr;
    int scratch[len];

    return _sort(arr, scratch, 0, len);
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
    mergeSort(arr, len);

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