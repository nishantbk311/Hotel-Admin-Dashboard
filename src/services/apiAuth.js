import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        // can pass any kind of information about this user
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  //data that is userData is saved into local storage automatically by auth

  if (error) throw new Error(error.message);

  // console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession(); //it will get the session from local storage

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  // console.log(data);

  if (error) throw new Error(error.message);

  return data?.user;
  // Since you’re getting data from an API call, it’s best practice to use optional chaining data?.user to prevent possible crashes if the API response is missing or malformed.
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // we will have same function working for both of these forms (form to update account and form to update password), but we
  // cannot update the password and fullName at the same time because they are located in different forms.
  // 1. Update password or fullName
  let updateData;
  // only one can be true at a time
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  // console.log(data);
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);
  return updatedUser;
}
