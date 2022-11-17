

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
