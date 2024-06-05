// Generates a unique ID(random hexadecimal string) for each note
module.exports = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);




//  II.WAY
//  let counter = 0;
//  module.exports = () => {
//     counter += 1;
//     return counter.toString(36);
// };