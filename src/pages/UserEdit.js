import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form, { SimpleItem, GroupItem } from 'devextreme-react/form';
import 'devextreme/dist/css/dx.light.css';
import '../Components/style.css';

const UserEdit = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/users/2`);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.error('User not found');
                }
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };
        fetchUser();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!user) return;

        try {
            const response = await fetch(`https://fakestoreapi.com/users/2`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Güncelleme başarısız');
            }

            alert('Kullanıcı güncellendi!');
            navigate('/users');
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    const handleFormChange = (e) => {
        const { dataField, value } = e;
        setUser((prevUser) => ({
            ...prevUser,
            [dataField]: value,
        }));
    };

    if (!user) return <div>Yükleniyor...</div>;

    return (
        <React.Fragment>
            <div className="long-title">
                <h3>Kullanıcı Bilgileri</h3>
            </div>
            <div className="form-container">
                <Form colCount={1} id="form" formData={user} onFieldDataChanged={handleFormChange}>
                    <SimpleItem dataField="ID" />
                    <GroupItem caption="Kişisel Bilgiler">
                        <SimpleItem dataField="name.firstname" caption="İsim" />
                        <SimpleItem dataField="name.lastname" caption="Soyisim" />
                        <SimpleItem dataField="username" caption="Kullanıcı Adı" />
                        <SimpleItem dataField="password" caption="Şifre" />
                        <SimpleItem dataField="phone" caption="Telefon" />
                    </GroupItem>
                    <GroupItem caption="Ev Adresi">
                        <SimpleItem dataField="address.city" caption="Şehir" />
                        <SimpleItem dataField="address.street" caption="Sokak" />
                        <SimpleItem ld="address.zipcode" caption="Posta Kodu" />
                    </GroupItem>
                </Form>
                <button className="update-button" onClick={handleUpdate}>Güncelle</button>
            </div>
        </React.Fragment>
    );
};
export default UserEdit