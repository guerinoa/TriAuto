import {useState, useEffect} from 'react' 

/* Any state change functions can be found here. Updating  & Deleting */
const HandleState = () => {

    /* CREATING INITIAL OBJECT, AND OBJECT ARRAY  */
    const [inventoryItems, setInventoryItems] = useState([]);
    const [readList, setReadList] = useState(false);
    const [isEditing1,setIsEditing1] = useState(false);

    
    /* Inventory fields can be added by simply updating iItems constants below, i.e. if wanted to add Quantity, can be placed right after price. */
    const [iItems,setiItems] = useState(
            {
                item: '',
                price: '' 
            }
    );

    /* FOR ADDING INVENTORY ITEMS  */ 
    const handleChange = e => {
        e.preventDefault() ;
        const target = e.target;
        const value = target.value;
        const name = target.name; 

        setiItems({
            ...iItems,
            [name]:value
        })
       
    }

    const handleSubmit = e => {
        e.preventDefault() ;
        const data = [
            ...inventoryItems,
            iItems
        ];
        setInventoryItems(data);
        setiItems({
            item: '',
            price: '' 
        });
    }
    
      /* FOR EDITING AND DELETING  */
    const handleChangeEdit = (event,index) => {

        event.preventDefault() ;
        const target = event.target;
        const value = target.value; 
        const name = target.name; 
        const data1 = inventoryItems.map((items,ind)=> ind ===index && 
                                                    {
                                                    ...items, 
                                                    [name]:value
                                                    }
                                                ||
                                                items
                                            );
                                   
        setInventoryItems(data1);
    }
  

    const handleDelete  = (event, index) => {
        event.preventDefault() ;
        const data = [...inventoryItems.slice(0,index),...inventoryItems.slice(index+1)]
        setInventoryItems(data);
    }


    /* For reading the inventory list, and toggling buttons for editing in ./App */

    function isReading (props) {
        setReadList(props)
    }
    function isEdit(bool){
        setIsEditing1(bool)
    }

    return {inventoryItems, iItems, handleChange, handleSubmit, handleChangeEdit, handleDelete, readList,isReading,isEditing1,isEdit}
}

export default HandleState
