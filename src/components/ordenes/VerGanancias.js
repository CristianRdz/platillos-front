import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getGananaciasFechas } from '../../services/ordenes/ordenesService';

export default function VerGanancias() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      if (startDate <= endDate) {
        fetchSalesData();
      } else {
        setError('La fecha de inicio debe ser menor o igual a la fecha final.');
      }
    }
  }, [startDate, endDate]);

  const fetchSalesData = async () => {
    setError(null);
    try {
      const response = await getGananaciasFechas(startDate.toISOString().slice(0, 19).replace('T', ' '), endDate.toISOString().slice(0, 19).replace('T', ' '));
      if (response) {
        setSalesData(response);
      } else {
        setSalesData(null);
        setError('No se encontraron ventas en el rango de fechas seleccionado.');
      }

    } catch (error) {
      setError('Ocurrió un error en la conexión.');
    }
  };

  return (
    <div className='container'>
      <div className='flex-row justify-content-center'>
        <label className='form-label m-1'>Fecha de Inicio: </label>
        <DatePicker
        className='form-control mt-1'
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          isClearable
        />
      </div>
      <div>
        <label className='form-label m-1'>Fecha de Fin: </label>
        <DatePicker
          className='form-control mt-1'
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          isClearable
        />
      </div>
      {error && <div className="text-danger">{error}</div>}
      {salesData && startDate && endDate && (
        <div className='text-center mt-3'>
          <h3>Ganancias</h3>
          <h4>Desde: {startDate.toISOString().slice(0, 10)}</h4>
          <h4>Hasta: {endDate.toISOString().slice(0, 10)}</h4>
          <h4>Total: ${salesData}</h4>
        </div>
      )}
    </div>

  );
}
