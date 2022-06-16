import React, { useEffect, useState } from 'react';
import './scss/tabla.scss';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { red } from '@mui/material/colors';

const baseUrl = 'https://marketlogic-back.herokuapp.com/clientes/'

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    }
}));

function TablaRegistros() {
    const styles = useStyles();
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    const [clienteSeleccionado, setClienteSeleccionado] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        direccion: ''
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setClienteSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(clienteSeleccionado);
    }

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            })
    }

    const peticionPost = async () => {
        await axios.post(baseUrl, clienteSeleccionado)
            .then(response => {
                peticionGet();
                setModalInsertar(false);
            })
    }

    const peticionPut = async () => {
        await axios.put(baseUrl + clienteSeleccionado._id, clienteSeleccionado)
            .then(response => {
                var dataNueva = data;
                dataNueva.map((e) => {
                    if (clienteSeleccionado._id === e._id) {
                        e.nombre = clienteSeleccionado.nombre;
                        e.correo = clienteSeleccionado.correo;
                        e.telefono = clienteSeleccionado.telefono;
                        e.direccion = clienteSeleccionado.direccion;
                    }
                })
                setData(dataNueva);
            })
            abrirCerrarModalEditar();
    }

    const peticionDelete = async () => {
        await axios.delete(baseUrl + clienteSeleccionado._id)
            .then(response => {
                setData(data.filter((e) => e._id !== clienteSeleccionado._id));
            })
            abrirCerrarModalEliminar();
    }

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const seleccionarCliente = (cliente, caso) => {
        setClienteSeleccionado(cliente);
        (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
    }

    useEffect(async () => {
        await peticionGet();
    }, [])

    const bodyInsertar = (
        <div className={styles.modal} id={'modal1'}>
            <h3>Agregar Nuevo Registro</h3>
            <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} />
            <br />
            <TextField name="correo" className={styles.inputMaterial} label="Correo" onChange={handleChange} />
            <br />
            <TextField name="telefono" type={"number"} className={styles.inputMaterial} label="Teléfono" onChange={handleChange} />
            <br />
            <TextField name="direccion" className={styles.inputMaterial} label="Dirección" onChange={handleChange} />
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
                <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEditar = (
        <div className={styles.modal} id={'modal2'}>
            <h3>Editar Registro</h3>
            <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.nombre} />
            <br />
            <TextField name="correo" className={styles.inputMaterial} label="Correo" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.correo} />
            <br />
            <TextField name="telefono" type={"number"} className={styles.inputMaterial} label="Teléfono" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.telefono} />
            <br />
            <TextField name="direccion" className={styles.inputMaterial} label="Dirección" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.direccion} />
            <br /><br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPut()}>Editar</Button>
                <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    )

    const bodyEliminar = (
        <div className={styles.modal} id={'modal3'}>
            <p>Estás seguro que deseas eliminar el registro <b>{clienteSeleccionado && clienteSeleccionado.nombre}</b> ? </p>
            <div align="right">
                <Button color="secondary" onClick={() => peticionDelete()} >Sí</Button>
                <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>

            </div>

        </div>
    )


    return (
        <div className="tabla">
            
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className='title' colSpan={3}>Clientes</TableCell>
                            <TableCell className='title' colSpan={3}>
                                <Button className='registro' onClick={() => abrirCerrarModalInsertar()}>Nuevo registro</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className='headers'>Nombre</TableCell>
                            <TableCell className='headers'>Correo</TableCell>
                            <TableCell className='headers'>Teléfono</TableCell>
                            <TableCell className='headers'>Dirección</TableCell>
                            <TableCell className='headers'>Fecha de Registro:</TableCell>
                            <TableCell className='headers'>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((e)=> (
                            <TableRow key={e.nombre}>
                                <TableCell>{e.nombre}</TableCell>
                                <TableCell>{e.correo}</TableCell>
                                <TableCell>{e.telefono}</TableCell>
                                <TableCell>{e.direccion}</TableCell>
                                <TableCell>{e.fecha}</TableCell>
                                <TableCell>
                                    <Edit className={styles.iconos} onClick={() => seleccionarCliente(e, 'Editar')} />
                                    &nbsp;&nbsp;&nbsp;
                                    <Delete className={styles.iconos} onClick={() => seleccionarCliente(e, 'Eliminar')} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
            </Modal>

            <Modal
                open={modalEditar}
                onClose={abrirCerrarModalEditar}>
                {bodyEditar}
            </Modal>

            <Modal
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}
            </Modal>
        </div>
    );
}

export default TablaRegistros;