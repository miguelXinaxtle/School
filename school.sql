--Creacion de la base de datos
CREATE DATABASE Escuela

GO

USE Escuela

GO

--Esquema de operación es utilizado para las tablas 
--cuyos datos cambian durante la operacion del dia a dia
CREATE SCHEMA Operacion

GO

--Esquema de catalogos, este esquema contiene los
--catalogo utilizados por las aplicaciones
CREATE SCHEMA Catalogo

GO

--Esquema de relación este esquema contiene las 
--realciones entre las tablas de catalogo y operación
CREATE SCHEMA Relacion

GO

--Todas las tablas deben de tener un campo identificador
--este campo debe ser unico, normalmente utilizo autoincrementables
--Tadas la tablas deben de tener una llave primaria
--Siempre es recomendable tratar de utilizar campos no nulos
--Elige el tipo y tamaño de campo adecuado a cada campo
CREATE TABLE [Catalogo].[Usuario]
(
	idUsuario				INT NOT NULL IDENTITY(1,1) PRIMARY KEY
	,correo					VARCHAR(70) NOT NULL
	,contrasenia			VARBINARY(100) NOT NULL
	,nombre					VARCHAR(100) NOT NULL
	,telefono				VARCHAR(20) NOT NULL
	,fecha					DATETIME NOT NULL
	,estatus				BIT NOT NULL
)

GO

CREATE TABLE [Catalogo].[Rol]
(
	idRol					INT NOT NULL IDENTITY(1,1) PRIMARY KEY
	,nombre					VARCHAR(50) NOT NULL
	,estatus				BIT NOT NULL
)

GO
--Incluso las tablas de relación necesitan un campo unico
--Los campos relacionados a otras tablas se agregan al final de la tabla
CREATE TABLE [Relacion].[UsuarioRol]
(
	idUsuarioRol			INT NOT NULL IDENTITY(1,1) PRIMARY KEY
	,idUsuario				INT NOT NULL
	,idRol					INT NOT NULL
)

GO
--las llaves foraneas mejoran la integridad de la base de datos
ALTER TABLE [Relacion].[UsuarioRol] ADD
CONSTRAINT FKUsuarioRol_Usuario FOREIGN KEY (idUsuario) REFERENCES [Catalogo].[Usuario] (idUsuario)

GO

ALTER TABLE [Relacion].[UsuarioRol] ADD
CONSTRAINT FKUsuarioRol_Rol FOREIGN KEY (idRol) REFERENCES [Catalogo].[Rol] (idRol)

GO

CREATE TABLE [Operacion].[UsuarioToken]
(
	idUsuarioToken			INT NOT NULL IDENTITY(1,1) PRIMARY KEY
	,token					VARCHAR(200) NOT NULL
	,fecha					DATETIME NOT NULL
	,idUsuario				INT NOT NULL
)

GO

ALTER TABLE [Operacion].[UsuarioToken] ADD
CONSTRAINT FKUsuaroToken_Usuario FOREIGN KEY (idUsuario) REFERENCES [Catalogo].[Usuario] (idUsuario)

--El sangrado es importante para la legibilidad
--Nombra los campos en todos tus querys

GO

-- =============================================
-- Author:			<Miguel Angel Reyes Xinaxtle>
-- Create date: 	<12/06/2020>
-- Description:	    <Agregar nuevo usuario>
-- =============================================
-- EXEC [Catalogo].[INS_USUARIO_SP]
-- =============================================
CREATE PROCEDURE [Catalogo].[INS_USUARIO_SP]
(
	@correo				VARCHAR(70)
	,@contrasenia		VARCHAR(15)
	,@nombre			VARCHAR(100)
	,@telefono			VARCHAR(20)
	,@err				NVARCHAR(100) = '' OUTPUT
)
AS
DECLARE
	@idUsuario			INT=0
	,@estatus			BIT=0
BEGIN

	--Contraseña de encripcion
	--quen0quedehue11aquen0quen0

	SELECT 
		@idUsuario = idUsuario 
		,@estatus = estatus
	FROM [Catalogo].[Usuario]
	WHERE correo = @correo

	--Valida que el correo sea unico
	if(@idUsuario > 0)
	BEGIN
		IF(@estatus = 1)
		BEGIN
			SET @err = 'El correo electrónico ya existe.'
		END
		ELSE
		BEGIN
			SET @err = 'El correo electrónico ya existe, pero esta deshabilitado.'
		END
	END
	ELSE
	BEGIN
		INSERT INTO [Catalogo].[Usuario]
		(
			[correo]
			,[contrasenia]
			,[nombre]
			,[telefono]
			,[fecha]
			,[estatus]
		)
		VALUES
		(
			@correo
			--Encripcion de la contraseña en base de datos
			,ENCRYPTBYPASSPHRASE(N'quen0quedehue11aquen0quen0', @contrasenia)
			,@nombre
			,@telefono
			,GETDATE()
			,1
		)
	END

	--Respuesta del store
	SELECT SCOPE_IDENTITY() idUsuario

END

GO

-- =============================================
-- Author:			<Miguel Angel Reyes Xinaxtle>
-- Create date: 	<12/06/2020>
-- Description:	    <Permite el acceso a un usuario>
-- =============================================
-- EXEC [Operacion].[LOGIN_SP]
-- =============================================
CREATE PROCEDURE [Operacion].[LOGIN_SP]
(
	@correo				VARCHAR(70)
	,@contrasenia		VARCHAR(15)
	,@err				NVARCHAR(100) = '' OUTPUT
)
AS
DECLARE
	@idUsuario			INT=0
	,@estatus			BIT=0
	,@password			VARCHAR(15)=NULL
BEGIN

	SELECT 
		@idUsuario = idUsuario 
		,@estatus = estatus
	FROM [Catalogo].[Usuario]
	WHERE correo = @correo

	--Valida que el usuario exista
	if(@idUsuario > 0)
	BEGIN
		IF(@estatus = 1)
		BEGIN
			SELECT 
				@password = DECRYPTBYPASSPHRASE(N'quen0quedehue11aquen0quen0', [contrasenia])
			FROM [Catalogo].[Usuario]
			WHERE idUsuario = @idUsuario
			--Valida que la contraseña sea correcta
			IF(@contrasenia = @password)
			BEGIN
				--Respuesta del store
				SELECT 
					idUsuario
					,correo
					,nombre
					,telefono
				FROM [Catalogo].[Usuario]
				WHERE idUsuario = @idUsuario
			END
			ELSE
			BEGIN
				SET @err = 'Correo electrónico y/o contraseña incorrecto.'
			END
		END
		ELSE
		BEGIN
			SET @err = 'El usuario esta deshabilitado.'
		END
	END
	ELSE
	BEGIN
		SET @err = 'Correo electrónico y/o contraseña incorrecto.'
	END

END

GO

-- =============================================
-- Author:			<Miguel Angel Reyes Xinaxtle>
-- Create date: 	<12/06/2020>
-- Description:	    <Agregar nuevo token>
-- =============================================
-- EXEC [Operacion].[INS_TOKEN_SP]
-- =============================================
CREATE PROCEDURE [Operacion].[INS_TOKEN_SP]
(
	@idUsuario			INT
	,@token				VARCHAR(200)
	,@err				NVARCHAR(100) = '' OUTPUT
)
AS
DECLARE
	@contadoridUsuario		INT
BEGIN

	SELECT @contadoridUsuario = COUNT(idUsuarioToken) 
	FROM [Operacion].[UsuarioToken]
	WHERE idUsuario = @idUsuario

	--valida sesiones anteriores
	IF(@contadoridUsuario > 0)
	BEGIN
		--Eliminamos las sesiones anteriores
		DELETE [Operacion].[UsuarioToken]
		WHERE idUsuario = @idUsuario
	END

	INSERT INTO [Operacion].[UsuarioToken]
	(
		[token]
		,[fecha]
		,[idUsuario]
	)
	VALUES
	(
		@token
		,GETDATE()
		,@idUsuario
	)

	--Respuesta del store
	SELECT SCOPE_IDENTITY() idUsuarioToken

END

GO

-- =============================================
-- Author:			<Miguel Angel Reyes Xinaxtle>
-- Create date: 	<12/06/2020>
-- Description:	    <Valida token>
-- =============================================
-- EXEC [Operacion].[VALIDA_TOKEN_SP]
-- =============================================
CREATE PROCEDURE [Operacion].[VALIDA_TOKEN_SP]
(
	@idUsuario			INT
	,@token				VARCHAR(200)
	,@err				NVARCHAR(100) = '' OUTPUT
)
AS
DECLARE
	@idUsuarioToken		INT=0
	,@fecha				DATETIME
	,@valido			BIT=0
BEGIN

	SELECT 
		@idUsuarioToken = idUsuarioToken 
		,@fecha = fecha
	FROM [Operacion].[UsuarioToken]
	WHERE idUsuario = @idUsuario
		AND token = @token

	--Valida que exista el token
	IF(@idUsuarioToken > 0)
	BEGIN
		--Valida que el token siga vivo
		--Los tokens se caducan cada hora
		IF(@fecha > DATEADD(HOUR,-1,GETDATE()))
		BEGIN
			--Activa la vida del token 1 hora mas
			UPDATE [Operacion].[UsuarioToken] 
			SET fecha = GETDATE()
			WHERE idUsuario = @idUsuario
				AND token = @token
			SET @valido = 1
		END
		ELSE
		BEGIN
			--Elimina los tokens expirados
			DELETE [Operacion].[UsuarioToken]
			WHERE idUsuario = @idUsuario
			SET @err = 'El token ha expirado'
		END
	END

	--Respuesta del store
	SELECT @valido tokenValido

END

GO


CREATE TABLE [Catalogo].[Escuela]
(
	idEscuela				INT NOT NULL IDENTITY(1,1) PRIMARY KEY
	,nombre					VARCHAR(100) NOT NULL
	,estado					VARCHAR(50) NOT NULL
	,ciudad					VARCHAR(70) NOT NULL
	,municipio				VARCHAR(100) NOT NULL
	,fecha					DATETIME NOT NULL
	,estatus				BIT NOT NULL
)

GO

-- =============================================
-- Author:			<Miguel Angel Reyes Xinaxtle>
-- Create date: 	<13/06/2020>
-- Description:	    <Agregar nueva escuela>
-- =============================================
-- EXEC [Catalogo].[INS_ESCUELA_SP] 'Vicente Gerrero', 'Tlaxcala', 'San pablo del monte', 'San Pedro'
-- =============================================
CREATE PROCEDURE [Catalogo].[INS_ESCUELA_SP]
(
	@nombre					VARCHAR(100)
	,@estado				VARCHAR(50)
	,@ciudad				VARCHAR(70)
	,@municipio				VARCHAR(100)
)
AS
BEGIN

	INSERT INTO [Catalogo].[Escuela]
	(
		nombre
		,estado
		,ciudad
		,municipio
		,fecha
		,estatus
	)
	VALUES
	(
		@nombre
		,@estado
		,@ciudad
		,@municipio
		,GETDATE()
		,1
	)

	SELECT SCOPE_IDENTITY() idEscuela

END

GO

-- =============================================
-- Author:			<Miguel Angel Reyes Xinaxtle>
-- Create date: 	<13/06/2020>
-- Description:	    <Modificar escuela>
-- =============================================
-- EXEC [Catalogo].[UPD_ESCUELA_SP] 1, 'Vicente Gerrero', 'Tlaxcala', 'San pablo del monte', 'San Pedro'
-- =============================================
CREATE PROCEDURE [Catalogo].[UPD_ESCUELA_SP]
(
	@idEscuela				INT
	,@nombre				VARCHAR(100)
	,@estado				VARCHAR(50)
	,@ciudad				VARCHAR(70)
	,@municipio				VARCHAR(100)
)
AS
BEGIN

	UPDATE [Catalogo].[Escuela]
	SET nombre = @nombre
		,estado = @estado
		,ciudad = @ciudad
		,municipio = @municipio
	WHERE idEscuela = @idEscuela

	SELECT @@ROWCOUNT modificado

END

GO

-- =============================================
-- Author:			<Miguel Angel Reyes Xinaxtle>
-- Create date: 	<13/06/2020>
-- Description:	    <Eliminar escuela>
-- =============================================
-- EXEC [Catalogo].[DEL_ESCUELA_SP] 1
-- =============================================
CREATE PROCEDURE [Catalogo].[DEL_ESCUELA_SP]
(
	@idEscuela				INT
)
AS
BEGIN

	DELETE [Catalogo].[Escuela]
	WHERE idEscuela = @idEscuela

	SELECT @@ROWCOUNT eliminado

END

GO

-- =============================================
-- Author:			<Miguel Angel Reyes Xinaxtle>
-- Create date: 	<13/06/2020>
-- Description:	    <Eliminar escuela>
-- =============================================
-- EXEC [Catalogo].[SEL_ESCUELA_SP]
-- =============================================
CREATE PROCEDURE [Catalogo].[SEL_ESCUELA_SP]
AS
BEGIN

	SELECT
		idEscuela
		,nombre
		,estado
		,ciudad
		,municipio
		,fecha
		,estatus
	FROM [Catalogo].[Escuela]
	ORDER BY idEscuela DESC

END

