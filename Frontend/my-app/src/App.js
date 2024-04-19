import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    description: '',
    ingredients: [], // Initialize ingredients as an empty array
  });
  const [user, setUser] = useState({ loggedIn: false, token: '' });



  const handleForm = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: name === 'ingredients' ? value.split(',').map((item) => item.trim()) : value,
    }));
  };

  const signupSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        url: "http://localhost:6001/auth/signUp",
        method: "post",
        data: data,
      });
      window.alert(res.data.msg);
    } catch (e) {
      window.alert("ERROR");
      console.error(e);
    }
  };

  const loginSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        url: "http://localhost:6001/auth/login",
        method: "post",
        data: data,
      });
      window.alert(res.data.msg);
      if (res.data.token) setUser({ loggedIn: true, token: res.data.token });
    } catch (e) {
      window.alert("ERROR");
      console.error(e);
    }
  };

  const addIngredient = () => {
    setData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ''], // Add an empty string for a new ingredient input
    }));
  };

  const removeIngredient = (index) => {
    setData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index), // Remove ingredient at specified index
    }));
  };
  const addRecipe = async (e) => {
    try {
      e.preventDefault();
      const res = await axios({
        url: 'http://localhost:6001/recipe/addRecipe',
        method: 'post',
        data: {
          name: data.name,
          description: data.description,
          ingredients: data.ingredients.filter(Boolean), // Remove empty strings from ingredients
        },
        headers: { Authorization: `Bearer ${user.token}` },
      });
      window.alert(res.data.msg);
    } catch (e) {
      window.alert('ERROR');
    }
  };
  // const getIngredients = async () => {
  //   try {
  //     const res = await axios({
  //       url: "http://localhost:6001/recipe/getIngredients",
  //       method: "get",
  //       headers: { Authorization: `Bearer ${user.token}` },
  //     });
  //     console.log(res.data);
  //   } catch (e) {
  //     window.alert("ERROR");
  //   }
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        {user.loggedIn ? (
          <form onSubmit={addRecipe} className="space-y-4">
            <h1 className="text-2xl font-bold text-center mb-4">Add Recipe</h1>
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleForm}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="description" className="block mb-1">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={data.description}
                onChange={handleForm}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="ingredients" className="block mb-1">
                Ingredients (enter each ingredient on a new line)
              </label>
              {data.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => {
                      const newIngredients = [...data.ingredients];
                      newIngredients[index] = e.target.value;
                      setData((prev) => ({ ...prev, ingredients: newIngredients }));
                    }}
                    className="w-full border rounded px-3 py-2"
                  />
                  <button type="button" onClick={() => removeIngredient(index)} className="text-red-500">
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={addIngredient} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Ingredient
              </button>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <form onSubmit={signupSubmit}>
              <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>
              <div>
                <label htmlFor="signup-name" className="block mb-1">Name</label>
                <input
                  type="text"
                  id="signup-name"
                  name="name"
                  value={data.name}
                  onChange={handleForm}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="signup-email" className="block mb-1">Email</label>
                <input
                  type="text"
                  id="signup-email"
                  name="email"
                  value={data.email}
                  onChange={handleForm}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block mb-1">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  value={data.password}
                  onChange={handleForm}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </form>

            <hr className="my-8 border-t" />

            <form onSubmit={loginSubmit}>
              <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
              <div>
                <label htmlFor="login-email" className="block mb-1">Email</label>
                <input
                  type="text"
                  id="login-email"
                  name="email"
                  value={data.email}
                  onChange={handleForm}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block mb-1">Password</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  value={data.password}
                  onChange={handleForm}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;