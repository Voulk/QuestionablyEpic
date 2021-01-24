


// This module is for catching errors reported by our functions. They won't have resulted in an app crash, and likely won't have impeded 
// the user but might represent bugs that we don't otherwise know about. If the player has a spec that doesn't exist for example, or if
// they have an incorrect entered covenant then we'll want to know about it so we can fix the cause.
// Current Types: Player, Legendaries, Covenants (including Conduits, Soulbinds etc).
// Message should be descriptive about which variable, which props, or which parameter did not meet expectations. 
// Result is the variable that was attempted to be set. It's optional.
export function reportError(type, message, result = "") {
    if (process.env.NODE_ENV === "production") {
        

    }
    else {
        // The app is in dev or test mode and we should just print the error to console instead of sending it to our database. 
        console.error("Error (" + type + "): " + message + ". Result: " + result);
    }

}