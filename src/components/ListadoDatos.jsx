const ListadoDatos = () => {
    const [horarios, setHorarios] = useState([]);
    useEffect(() => {
      const fetchhorarios = async () => {
        const horariosCol = collection(db, "horarios");
        const horariosSnapshot = await getDocs(horariosCol);
        const horariosList = horariosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        sethorarios(horariosList);
      };
      fetchhorarios();
    }, []);
    return (
      <div>
        <h2>Listado de horarios</h2>
        <ul>
          {horarios.map(horario => (
            <li key={horario.id}>
              {horario.nombre} - ${horario.precio}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  export default ListadoDatos;