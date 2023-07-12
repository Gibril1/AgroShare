function generateAlphanumericString() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let alphanumericString = '';
  
    for (var i = 0; i < 6; i++) {
      alphanumericString += characters.charAt(Math.floor(Math.random() * 62));
    }
  
    // Shuffle the characters
    let shuffledAlphanumericString = alphanumericString.split('').sort(function(){
      return 0.5 - Math.random();
    }).join('');
  
    return shuffledAlphanumericString;
  }
  