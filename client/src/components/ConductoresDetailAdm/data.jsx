let id = 1;

export const roles = 
[
    {
        id: id++,
        rol: 'Administrador',
        asignacion: false
    },
    {
        id: id++,
        rol: 'Moderador',
        asignacion: true
    },
    {
        id: id++,
        rol: 'Supervisor',
        asignacion: true
    }
];
