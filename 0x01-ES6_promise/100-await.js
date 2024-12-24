import { uploadPhoto, createUser } from './utils.js';

async function asyncUploadUser() {
  try {
    // Run both async functions concurrently using Promise.all
    const [photoResponse, userResponse] = await Promise.all([
      uploadPhoto(),
      createUser()
    ]);

    // Return the formatted response object
    return {
      photo: photoResponse,
      user: userResponse
    };
  } catch (error) {
    // If any error occurs, return object with null values
    return {
      photo: null,
      user: null
    };
  }
}

export default asyncUploadUser;
