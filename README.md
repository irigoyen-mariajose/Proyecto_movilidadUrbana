#Andensur - aplicación de movilidad urbana de Neuquén

###Integrantes del grupo

*Dahud Pedro Tomas

González Facundo

Irigoyen maria José

Lepe Mateo

Rocha Aixa Antonela

Rodríguez Ormanchea Tiago

Rojas Ángeles Eluney del Milagro
*

##Andensur - objetivo

**Andensur es una aplicación enfocada en la movilidad urbana del valle Neuquén. Tiene como objetivo facilitar y optimizar el uso del tren, permitiendo que se pueda conocer los horarios, paradas e información como tarifas y servicios. El objetivo también es incentivar a más personas a hacer uso de transporte ferroviario, dándoles una herramienta que les permita acceder de una forma mas sencilla al servicio.**

##Herramientas utilizadas

**•  Canva(presentacion de la interfaz).
•JS
•CSS
• GitHub
•Editor.md**

##Descripción de las pantallas

####• Pantalla de inicio:
**Bienvenida al usuario, Permitiéndole acceder a todas las interfaces y funciones de la aplicación.
Permite el acceso a un login, registro, notificaciones, soporte y los horarios del tren.**

####• Login: 
**Acá podemos iniciar sesión, en caso de ya contar una cuenta creada se puede acceder fácilmente desde Google o Facebook. En caso de no contar con una se puede registrar el usuario.**

####• búsqueda del mapa: 
**Esta pantalla permite programar un viaje, ver búsquedas recientes y visualizar el mapa de la ciudad de Neuquén. podemos observar la ruta y las paradas.**

####• Mapa:
**Al seleccionar una parada esta se marcara con un color verde y mostrará el estado del tren y su horario de llegada. También permitirá notificar unos minutos antes de que el tren arribe.**

####• notificaciones: 
**En esta pantalla podemos visualizar toda información útil para el usuario, como aumento de la tarifa, nuevas paradas, horarios, cualquier complicación, así se mantiene al usuario informado de cualquier cambio o nueva información.**

####• soporte: 
**En esta sección podemos contar con un soporte para el usuario y para poder reportar un problema ocurrido que afecte el funcionamiento del transporte.**

## Tecnologias utilizadas
React
Javascript
HTML/CSS
React Router DOM 
Firebase
React icons 
Material UI

## Funcionalidades implementadas
Pantallas diseñadas 
Login y registro de usuarios 
Routes hechos entre nuestras interfaces
Navegación con React Router
Protección de rutas 
Cerrar sesion simulado
Redirección entre vistas
Notificaciones simuladas
Interfaz de soporte y reclamos


## Capturas de pantalla 
![Login](/src/components/Imagenes/Login.png)
![Registro](/src/components/Imagenes/Registro.png)
![Pantalla_de_inicio](/src/components/Imagenes/Pantalla%20Inicio.png)




## Login simulado

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>

      <Route path="/" element={<Navigate to="/FrmIniciosesion" replace />} />

      {/* Login */}
      <Route
        path="/FrmIniciosesion"
        element={
          !isAuthenticated ? (
            <FrmIniciosesion onFrmIniciosesion={() => setIsAuthenticated(true)} />
          ) : (
            <Navigate to="/Home" replace />
          )
        }
      />

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
