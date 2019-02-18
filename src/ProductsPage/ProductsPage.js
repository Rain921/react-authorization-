import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

const modal = {

    textAlign: 'center'

}

const list = {
    listStyle: 'none',
    padding: 0
}



const TableComponent = ({ tableData }) => <table><tbody>
    {tableData.map(d => <tr key={d.id}>
        <td>{d.firstname}</td>
        <td>{d.lastname}</td>
    </tr>)}
</tbody></table>


class ProductsPage extends React.Component {



    state = {
        elements: [
            {
                id: 1,
                title: 'Deleted',
            },
            {
                id: 2,
                title: 'Deleted',
            },
            {
                id: 3,
                title: 'Deleted',
            },
            {
                id: 4,
                title: 'Deleted',
            },
            {
                id: 5,
                title: 'Deleted',
            },
        ],
        data: [
            { firstname: "Xriden", lastname: "grtd", id: 6 },
            { firstname: "Aicto", lastname: "Rigt", id: 7 },
            { firstname: "Vitalij", lastname: "xikot", id: 8 },
             { firstname: "Birigth", lastname: "nikotin", id: 9 }

        ], 
        sortBy: "firstname",
        modalIsOpen: false

    };

    handleChange = (event) => this.setState(
        { sortBy: event.target.value }
    );
    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };


    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        Modal.setAppElement('body');

    }


    handleDeleteElement = id => {
        this.setState(prevState => ({
            elements: prevState.elements.filter(el => el.id != id)
        }));
    };






    render() {

        const { data } = this.state;
        const { sortBy } = this.state;
        const sortedData = data.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1)

        const { elements } = this.state;




        return (
            <div className="col-md-12 modal-item" style={modal}>
                <div><Link to="/">Back</Link></div>

                <h3>Modal list</h3>

                <ul style={list}>

                    {elements.map(el => (
                        <li key={el.id}>
                            <button onClick={this.openModal}>Open Modal</button>
                            <button onClick={() => { this.handleDeleteElement(el.id) }}>{el.title}</button>

                        </li>

                    ))}

                    <select value={sortBy} onChange={this.handleChange}>
                        <option value="firstname">First Name</option>
                        <option value="lastname">Last Name</option>
                    </select>
                    <h2>The table: </h2>
                    <TableComponent tableData={sortedData} />


                </ul>

                <div>
                    <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                        <button onClick={this.closeModal}>close</button>
                        <div> a modal</div>
                    </Modal>

                </div>

            </div>

        );


    }

}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedProductsPage = connect(mapStateToProps)(ProductsPage);
export { connectedProductsPage as ProductsPage };