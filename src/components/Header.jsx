const Header = ({ handleToggleMenu }) => {
    return (
        <div className="header-part" style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px"}}>
            <button style={{marginTop: "6px", paddingLeft: "16px"}} onClick={handleToggleMenu} className="open-nav-button">
                <i className="fa-solid fa-bars"></i>
            </button>
            <h1 className="text-gradient">Pokédex</h1>
        </div>
    );
};

export default Header;