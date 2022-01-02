import { useState } from 'react';
import Select from './Select';
const initialState = [
    {
        label: "First Name", value: "first_name"
    }, {
        label: "Last Name", value: "last_name"
    }, {
        label: "Gender", value: "gender"
    }, {
        label: "Age", value: "age"
    }, {
        label: "Account Name", value: "account_name"
    }, {
        label: "City", value: "city"
    }, {
        label: "State", value: "state"
    },
]

function Sidebar(props) {
    const [segmentName, setSegmentName] = useState('');
    const [selectedVal, setSelectedVal] = useState([
        { value: 'defValue', list: initialState }
    ])


    const addSegmentHandler = (e) => {
        e.preventDefault()
        if (selectedVal.length === initialState.length) { return alert('All values selected') }
        let copySel = [...selectedVal];
        let selectVal = copySel.map(item => item.value)
        let checkVal = selectVal.filter(item => item === 'defValue');
        if (checkVal.length > 0) {
            alert('Please select value');
            return;
        }
        let filterVal = copySel[copySel.length - 1].list.filter(filItem => selectVal[selectVal.length - 1] !== filItem.value)
        setSelectedVal(prev => [...prev, { value: 'defValue', list: filterVal }])
    }

    const changeHandler = (e, index) => {
        let prevSelectedValue = selectedVal[index].value;
        let prevSelectedLabel;
        if (prevSelectedValue !== 'defValue') { prevSelectedLabel = initialState.filter(item => item.value === prevSelectedValue)[0].label; }
        let copyVal = [...selectedVal];
        copyVal[index].value = e.target.value;
        copyVal[index].label = e.target.selectedOptions[0].text;
        if (copyVal.length > 1) {
            let fil = copyVal.map((item, itemIndex) => {
                if (itemIndex !== index) {
                    let val = { value: item.value }
                    val.list = item.list.filter(filItem => filItem.value !== e.target.value);
                    if (prevSelectedValue !== 'defValue') { val.list.push({ value: prevSelectedValue, label: prevSelectedLabel }) }
                    return val;
                } else {
                    return item;
                }
            })
            setSelectedVal(fil)
            return;
        }
        setSelectedVal(copyVal)
    }

    const deleteHandler = (index) => {
        let copyVal = [...selectedVal];
        let selectedValue = copyVal.filter((item, filIndex) => filIndex === index)
        let selectedObject = initialState.find(item => {
            return selectedValue[0].value === item.value
        })
        let filterVal = copyVal.filter((item, filIndex) => filIndex !== index);
        filterVal.forEach(item => item.list.push(selectedObject))
        setSelectedVal(filterVal)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let selectVal = selectedVal.map(item => item.value)
        let resultValue = {
            "segment_name": segmentName,
            schema: []
        }
        selectVal.map(selItem => {
            initialState.map(inItem => {
                if (selItem === inItem.value) {
                    resultValue.schema.push({ [inItem.value]: inItem.label })
                }
            })
        })
        console.log(resultValue, "Result")
    }

    return <div className={`sidebar ${props.view ? 'active' : null}`}>
        <form onSubmit={handleSubmit}>
            <div>
                <label className='form-label'>Enter the Name of the Segment</label>
                <input className='form-control' placeholder='Enter segment name' value={segmentName} onChange={(e) => setSegmentName(e.target.value)} />
            </div>
            <p>To save your segment, you need to add the schemas to build the query.</p>
            {
                selectedVal.map((item, index) => {
                    return <Select
                        key={index}
                        item={item}
                        index={index}
                        deleteHandler={deleteHandler}
                        changeHandler={changeHandler}
                        selectedVal={selectedVal}
                    />
                })
            }

            <button className='btn-text' type='button' onClick={addSegmentHandler}>+ Add segment </button>
            <div style={{ marginTop: '30px' }}>
                <button type='submit' className='btn-save'>Save segment</button>
            </div>
        </form>
    </div>
}

export default Sidebar;