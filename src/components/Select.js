
function Select(props) {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <select value={props.item.value} onChange={(e) => props.changeHandler(e, props.index)} className='form-control' required>
                <option value='defValue' disabled>Default value</option>
                {props.item.list.map((option, inIndex) => {
                    return <option
                        key={inIndex}
                        value={option.value}
                        selected={props.item.value === option.value ? "selected" : null}
                    >
                        {option.label}
                    </option>
                })}
            </select>
            {props.index !== 0 ? <button type='button' className='btn-minus' onClick={() => props.deleteHandler(props.index)}>-</button> : null}
        </div>

    )
}

export default Select;