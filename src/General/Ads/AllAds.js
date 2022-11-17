

export const loadBannerAd = (patronStatus) => {
    if (process.env.NODE_ENV !== "development" && (patronStatus === "Basic" || patronStatus === "Standard")) {
        console.log("Loading ad");
        window['nitroAds'].createAd('banner2', {
            "refreshLimit": 10,
            "refreshTime": 60,
            "renderVisibleOnly": false,
            "refreshVisibleOnly": true,
            "sizes": [
              [
                "728",
                "90"
              ]
            ],
            "report": {
              "enabled": true,
              "wording": "Report Ad",
              "position": "top-right"
            }
          });
    }

}

export const loadBottomBannerAd = (patronStatus) => {
    if (process.env.NODE_ENV !== "development" && (patronStatus === "Basic" || patronStatus === "Standard")) {
        console.log("Loading ad2");
        window['nitroAds'].createAd('qelivead2', {
            "refreshLimit": 10,
            "refreshTime": 90,
            "renderVisibleOnly": true,
            "refreshVisibleOnly": true,
            "sizes": [
              [
                "728",
                "90"
              ]
            ],
            "report": {
              "enabled": true,
              "icon": true,
              "wording": "Report Ad",
              "position": "bottom-right"
            },
            "mediaQuery": "(min-width: 320px) and (max-width: 767px)"
          });
    }
}
