using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Task.Models;

namespace Task.Repositorio
{
    public class UsuarioRepository : ConnectionDB, IRepository<Usuario>
    {
        public UsuarioRepository(IConfiguration configuration) : base(configuration)
        {

        }
       
        public int Create(Usuario elemento)
        {
            using (IDbConnection dbConnection = Connection)
            {
                if (elemento.Id_direccion== 0)
                    elemento.Id_direccion = null;
                dbConnection.Open();
                return dbConnection.ExecuteScalar<int>(@"INSERT INTO  USUARIO(Nombre,Paterno,Materno,Edad,Id_Direccion) 
                                        VALUES(@Nombre,@Paterno,@Materno,@Edad,@Id_Direccion)
                                        RETURNING Id_usuario", elemento);
            }
        }

        public void Delete(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();

                var user = FindById(id);
                dbConnection.Execute(@"DELETE FROM DIRECCION WHERE Id_direccion =@Id_direccion ", new { Id_direccion = user.Id_direccion });

                dbConnection.Execute(@"DELETE FROM USUARIO WHERE ID_USUARIO=@Id_usuario", new { Id_usuario= id });
                

            }
        }

        public void Update(Usuario elemento)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                dbConnection.Execute(@"UPDATE  USUARIO SET NOMBRE=@Nombre
                ,PATERNO=@Paterno
                , MATERNO=@Materno
                ,ID_DIRECCION=@Id_direccion
                ,EDAD=@Edad WHERE ID_USUARIO=@Id_usuario",elemento);
            }
        }

        public IEnumerable<Usuario> FindAll()
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Usuario>("SELECT  * FROM USUARIO");
            }
        }

        public Usuario FindById(int? id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Usuario>("SELECT  * FROM USUARIO WHERE id_usuario=@Id", new
                {
                    Id =id
                }).FirstOrDefault();

            }
        }
    }
}
