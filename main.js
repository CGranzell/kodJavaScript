const onSubmit = () => {
  // tar emot höjd på rummmet
  const roomHeight = document.getElementById('roomHeight').value;
  // tar emot bredd på rummmet
  const roomWidth = document.getElementById('roomWidth').value;

  // tar emot start position Y axel
  let currentPositionY = document.getElementById('currentPositionY').value;
  // tar emot start position X axel
  let currentPositionX = document.getElementById('currentPositionX').value;
  // tar emot bilens start riktning
  const currentDirectionUnTrimmed =
    document.getElementById('currentDirection').value;
  // gör text till små bokstäver
  let currentDirectionToLowerCase = currentDirectionUnTrimmed.toLowerCase();
  // trimmar bort spaces
  let currentDirection = currentDirectionToLowerCase.trim();

  // kollar om input är korrekt
  if (
    currentDirection !== 'n' &&
    currentDirection !== 's' &&
    currentDirection !== 'w' &&
    currentDirection !== 'e'
  ) {
    document.getElementById(
      'result'
    ).innerHTML = `Invalid current direction: ${currentDirection}. Please enter 'n', 's', 'w', or 'e'.`;
    return;
  }

  // init på commands
  let commands = [];
  // tar emot commands
  const userCommandsUnTrimmed = document.getElementById('commands').value;
  // gör text till små bokstäver
  let userCommandsToLowerCase = userCommandsUnTrimmed.toLowerCase();
  // trimmar bort spaces
  let userCommands = userCommandsToLowerCase.trim();

  // lägger till värden i commands array
  commands = userCommands.split('');

  // kollar om bilen krockar
  const checkBoundary = () => {
    if (
      currentPositionX < 0 ||
      currentPositionX > roomWidth ||
      currentPositionY < 0 ||
      currentPositionY > roomHeight
    ) {
      document.getElementById(
        'result'
      ).innerHTML = `The car drove into the wall at Y = ${currentPositionY}, X = ${currentPositionX} and facing ${currentDirection}.`;
      return false;
    }
    return true;
  };

  // loopar igenom commands array
  for (let i = 0; i < commands.length; i++) {
    // kollar om user input är korrekt
    if (
      commands[i] !== 'f' &&
      commands[i] !== 'b' &&
      commands[i] !== 'l' &&
      commands[i] !== 'r'
    ) {
      document.getElementById(
        'result'
      ).innerHTML = `Invalid command: ${commands[i]}. Please enter 'f', 'b', 'l', or 'r'.`;
      return;
    }

    switch (currentDirection) {
      case 'n':
        if (commands[i] === 'f') {
          currentPositionY++;
          if (!checkBoundary()) {
            return;
          }
        } else if (commands[i] === 'b') {
          currentPositionY--;

          if (!checkBoundary()) {
            return;
          }
        } else if (commands[i] === 'l') {
          currentDirection = 'w';
        } else if (commands[i] === 'r') {
          currentDirection = 'e';
        }
        break;
      case 's':
        if (commands[i] === 'f') {
          currentPositionY--;

          if (!checkBoundary()) {
            return;
          }
        } else if (commands[i] === 'b') {
          currentPositionY++;

          if (!checkBoundary()) {
            return;
          }
        } else if (commands[i] === 'l') {
          currentDirection = 'e';
        } else if (commands[i] === 'r') {
          currentDirection = 'w';
        }
        break;
      case 'w':
        if (commands[i] === 'f') {
          currentPositionX--;

          if (!checkBoundary()) {
            return;
          }
        } else if (commands[i] === 'b') {
          currentPositionX++;

          if (!checkBoundary()) {
            return;
          }
        } else if (commands[i] === 'l') {
          currentDirection = 's';
        } else if (commands[i] === 'r') {
          currentDirection = 'n';
        }
        break;
      case 'e':
        if (commands[i] === 'f') {
          currentPositionX++;

          if (!checkBoundary()) {
            return;
          }
        } else if (commands[i] === 'b') {
          currentPositionX--;

          if (!checkBoundary()) {
            return;
          }
        } else if (commands[i] === 'l') {
          currentDirection = 'n';
        } else if (commands[i] === 'r') {
          currentDirection = 's';
        }
        break;
    }
  }

  document.getElementById(
    'result'
  ).innerHTML = `everything went ok, the end position is Y = ${currentPositionY}, X = ${currentPositionX} and facing ${currentDirection}`;
};
