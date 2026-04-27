const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    return password.length >= 6; // Minimum length for password
};

const validateMachineType = (machineType) => {
    const validTypes = ['CNC', 'Lathe', 'Milling', 'Router', 'Laser'];
    return validTypes.includes(machineType);
};

const validateUnits = (units) => {
    const validUnits = ['Imperial', 'Metric'];
    return validUnits.includes(units);
};

const validateExperienceLevel = (level) => {
    const validLevels = ['Beginner', 'Intermediate', 'Expert'];
    return validLevels.includes(level);
};

const validateMaterialPreference = (material) => {
    const validMaterials = ['Aluminum', 'Steel', 'Plastic', 'Wood'];
    return validMaterials.includes(material);
};

export {
    validateEmail,
    validatePassword,
    validateMachineType,
    validateUnits,
    validateExperienceLevel,
    validateMaterialPreference
};