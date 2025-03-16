CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    Rol_id INT NULL,
    administrador_id INT NULL,
    FOREIGN KEY (Rol_id) REFERENCES Roles(id),
    FOREIGN KEY (administrador_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE proyectos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    administrador_id INT NOT NULL,
    FOREIGN KEY (administrador_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

create table usuarios_proyecto (
id SERIAL primary key,
usuarios_id int not null,
proyecto_id int not null,
foreign key (usuario_id) references usuarios(id) on delete cascade,
foreign key (proyecto_id) references proyectos(id) on delete cascade,
unique (usuario_id, proyecto_id)

);

CREATE TABLE roles (
id serial primary key,
nombre varchar(100) not null unique,

);

create table permisos (
id serial primary key,
nombre varchar(100) not null unique,
);

insert into permisos (nombre) values ('crear'), ('visualizar'), ('actualizar'), ('eliminar');

create table roles_permisos (
id serial primary key,
rol_id int not null,
permiso_id int not null,
foreign key ( rol_id) references roles(id) on delete cascade,
foreign key (permiso_id) references permisos(id) on delete cascade,
unique (rol_id,permiso_id)
);