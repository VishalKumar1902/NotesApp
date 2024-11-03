import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MyNotes from "./components/MyNotes";
import CreateNotes from "./components/CreateNotes";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import NoteDetail from "./components/NoteDetail";
import UpdateNote from "./components/UpdateNote";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protecting these routes with PrivateRoute */}
        <Route
          path="/mynotes"
          element={
            <PrivateRoute>
              <MyNotes />
            </PrivateRoute>
          }
        />
        <Route
          path="/createnotes"
          element={
            <PrivateRoute>
              <CreateNotes />
            </PrivateRoute>
          }
        />

        <Route
          path="/note/:id"
          element={
            <PrivateRoute>
              <NoteDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <PrivateRoute>
              <UpdateNote />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
