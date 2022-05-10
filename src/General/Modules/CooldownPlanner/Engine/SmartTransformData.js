// Function will create plan data by merging healer casts that are used near boss abilities, rather than create a new instance for each seperate cast.
// we will need to convert times back into seconds and use that as a basis on whether the objects should be merged with the boss ability.
// we can do this by using moment as below (we may swap from moment to another date/time library such as day.js or luxon as they are better alternatives to moment)
// moment(key.time, "mm:ss").seconds() if key.time = "01:15" as a string, this will convert it to 75 as a number

// for some abilities we may need to check instances of damage taken and use the initial hit as a cast time (currently not implemented for standard importing either)
// we can potentially add options for the user to change in the future such as 3 instances of the spell 8 seconds apart before the user imports the log
