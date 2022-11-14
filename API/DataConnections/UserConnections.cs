using Dapper;
using DapperContext;
using Domain.Interface;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace DataConnections
{
    public class UserConnections : IUserRepository
    {
        private readonly DataContext _dataContext;
        public UserConnections(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<UserModel> DeleteUser(int id)
        {
            var query = "DeleteUser_sp";
            DynamicParameters dp = new DynamicParameters();
            dp.Add("@UserID", id);

            using(var conn = _dataContext.GetConnection())
            {
                var result = await conn.QueryFirstAsync<UserModel>(query, dp, commandType: CommandType.StoredProcedure);
                return result;
            }
        }
          
        public async Task<IEnumerable<UserModel>> GetAllUsers()
        {
            var query = "GetAllUsers_sp";
            DynamicParameters dp = new DynamicParameters();

            using(var conn = _dataContext.GetConnection())
            {
                var result = await conn.QueryAsync<UserModel>(query, dp, commandType: CommandType.StoredProcedure);
                return result.ToList();
            }
        }

        public async Task<UserModel> GetOneUserByID(int id)
        {
            var query = "GetOneUser_sp";
            DynamicParameters dp = new DynamicParameters();
            dp.Add("@UserID", id);

            using (var conn = _dataContext.GetConnection())
            {
                var result = await conn.QueryFirstAsync<UserModel>(query, dp, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<UserModel> InsertUser(UserModel user)
        {
            var query = "InsertUser_sp";
            DynamicParameters dp = new DynamicParameters();
            dp.Add("@Username", user.Username);
            dp.Add("@PhoneNumber", user.PhoneNumber);
            dp.Add("@EmailAddress", user.EmailAddress);
            dp.Add("@Password", user.Username);

            using(var conn = _dataContext.GetConnection())
            {
                var result = await conn.QuerySingleAsync<UserModel>(query, dp, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<UserModel> UpdateUser(UserModel user)
        {
            var query = "UpdateUser_sp";
            DynamicParameters dp = new DynamicParameters();
            dp.Add("@UserID", user.UserID);
            dp.Add("@Username", user.Username);
            dp.Add("@PhoneNumber", user.PhoneNumber);
            dp.Add("@EmailAddress", user.EmailAddress);
            dp.Add("@Password", user.Username);

            using (var conn = _dataContext.GetConnection())
            {
                var result = await conn.QuerySingleAsync<UserModel>(query, dp, commandType: CommandType.StoredProcedure);
                return result;
            }
        }
    }
}
