import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DefaultComponent from './components/DefaultComponent';
import PrivateRoute from './routes/PrivateRoute'; 
import { routes } from './routes';

export default function App() {
  const user = useSelector((state) => state.user.current);

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const Page = route.page;
          const Layout = route.isShowHeader ? DefaultComponent : Fragment;

          if (route.isPrivate) {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute user={user}>
                    <Layout>
                      <Page />
                    </Layout>
                  </PrivateRoute>
                }
              >
                {route.children && route.children.map((child, childIndex) => (
                  <Route
                    key={childIndex}
                    path={child.path}
                    element={<child.page />}
                  />
                ))}
              </Route>
            );
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            >
              {route.children && route.children.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  path={child.path}
                  element={<child.page />}
                />
              ))}
            </Route>
          );
        })}
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </Router>
  );
}
