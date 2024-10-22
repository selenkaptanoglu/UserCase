import React, { useCallback, useState, useEffect } from 'react';
import DataGrid, { Column, Button, GroupPanel, SearchPanel, } from 'devextreme-react/data-grid';
import '../assets/css/login.css';

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setData(data || []);
        };
        fetchData();
    }, []);

    return (
        <DataGrid dataSource={data} allowColumnReordering={true} rowAlternationEnabled={true} showBorders={true}
            width="100%">
            <GroupPanel visible={true} />
            <SearchPanel visible={true} highlightCaseSensitive={true} />
            <Column dataField="id" groupIndex={0} />
            <Column dataField="title" dataType="string" />
            <Column dataField="price" caption="price" dataType="number" format="currency" alignment="right" />
            <Column dataField="category" dataType="string" />
            <Column dataField="description" dataType="string" />
            <Column dataField="image" dataType="string" width={150} />
        </DataGrid>
    );
};

export default App;
