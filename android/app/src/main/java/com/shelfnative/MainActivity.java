package com.shelfnative;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.content.Intent;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactRootView;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.common.LifecycleState;
import com.shelfnative.modules.ephemeralstorage.EphemeralStoragePackage;

public class MainActivity extends ReactActivity {

    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mReactRootView = new ReactRootView(this);

    Intent intent = getIntent();
    String action = intent.getAction();
    String type = intent.getType();
    String inputText = intent.getStringExtra(Intent.EXTRA_TEXT);

    mReactInstanceManager = ReactInstanceManager.builder()
      .setApplication(getApplication())
      .setBundleAssetName("index.android.bundle")
      .setJSMainModuleName("index.android")
      .addPackage(new MainReactPackage())
      .addPackage(new EphemeralStoragePackage(inputText))
      .setUseDeveloperSupport(BuildConfig.DEBUG)
      .setInitialLifecycleState(LifecycleState.RESUMED)
      .build();

    mReactRootView.startReactApplication(mReactInstanceManager, "shelfnative", null);

    setContentView(mReactRootView);

    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "shelfnative";
    }
}
