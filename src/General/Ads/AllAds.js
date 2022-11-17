

export const loadBannerAd = (patronStatus) => {
    console.log("Trying to load ad" + patronStatus);
    if (process.env.NODE_ENV !== "development" && (patronStatus === "Basic" || patronStatus === "Standard")) {
        console.log("Loading Ad: Banner2");
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
  console.log("Trying to load ad2" + patronStatus);
    if (process.env.NODE_ENV !== "development" &&  (patronStatus === "Basic" || patronStatus === "Standard")) {
        console.log("Loading ad2");
        window['nitroAds'].createAd('qelivead2', {
            "refreshLimit": 10,
            "refreshTime": 60,
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
          });
    }
}
