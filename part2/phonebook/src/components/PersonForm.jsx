function PersonForm({ 
    handleSubmit, 
    newName, 
    handleChangeNewName,
    newPhone,
    handleChangeNewPhone
}) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name:
                <input  
                    value={newName}
                    onChange={handleChangeNewName}
                />
                number:
                <input 
                    value={newPhone}
                    onChange={handleChangeNewPhone}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm