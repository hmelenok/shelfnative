package com.shelfnative.modules.ephemeralstorage;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.util.Map;

public class EphemeralStorageModule extends ReactContextBaseJavaModule {
  private String inputText;

  public EphemeralStorageModule(ReactApplicationContext reactContext, String _inputText) {
    super(reactContext);
    this.inputText = _inputText;
  }

  @Override
  public String getName() {
    return "EphemeralStorage";
  }

  public String getInputText() {
    return inputText;
  }

  @ReactMethod
  public void readOnceAsync(Callback successCallback) {
    successCallback.invoke(getInputText());
    this.inputText = null;
  }

}