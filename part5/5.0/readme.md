<h3>backend testing works/run the tests individually:<h3>

- npm run test ./tests/note_api.test.js

- npm run test ./tests/users.test.js

<h3>front end Testing: all pass with backend script:<h3>

- npm run dev

<h3>playwright all pass with backend script: <h3>

- npm run start:test


<h1>DEPLOYED Notes APP:</h1>
https://notesapp-mvge.onrender.com/

-1 Problem with localStorage. 
navigator localStorage dont delete userToken when expires. (i think to fix in future feateures);

solution: For now, when the token expires, you have to log out and log back in.
