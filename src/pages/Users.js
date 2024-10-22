import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, Column } from "devextreme-react/data-grid";
import { Button } from 'devextreme-react/button';
import 'devextreme/dist/css/dx.light.css';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const gridProps = {
    dataSource: "users",
    showBorders: true,
    columnAutoWidth: true,
    keyExpr: "id"
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://fakestoreapi.com/users');
      const users = await response.json();
      setUsers(users || []);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const response = await fetch(`https://fakestoreapi.com/users/${userId}`, {
      method: "DELETE"
    });
    if (response.ok) {
      // Kullanıcıyı silme başarılı ise, kullanıcılar listesinden çıkar
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      alert('Kullanıcı silindi!');
    } else {
      console.error('Kullanıcı silme hatası:', await response.json());
    }
  };

  const handleLogout = () => {
    navigate('/loginPages');
  };

  return (
    <div>
      <h2>Kullanıcı Listesi</h2>
      <Button onClick={handleLogout} icon="remove" text="Çıkış" />
      <DataGrid {...gridProps} dataSource={users}>
        <Column caption="Ad" cellRender={({ data }) => (<div>{data.name.firstname}</div>)} />
        <Column dataField="lastname" cellRender={({ data }) => (<div>{data.name.lastname}</div>)} />
        <Column dataField="id" caption="ID" />
        <Column dataField="email" caption="Email" />
        <Column dataField="password" caption="Şifre" />
        <Column dataField="phone" caption="Telefon Numarası" />
        <Column dataField="id" caption="Durum" cellRender={({ data }) => (
          <div>
            <Link to={`/userEdit`}><Button icon="edit" text="Düzenle" /></Link>
            <Button onClick={() => handleDelete(data.id)} icon="trash" text="Sil" />
          </div>
        )} />
      </DataGrid>
    </div>
  );
}
export default Users;