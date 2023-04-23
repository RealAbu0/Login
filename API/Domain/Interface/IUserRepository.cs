using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IUserRepository
    {
        
        Task<IEnumerable<UserModel>> GetAllUsers();
        Task<UserModel> GetOneUserByID(int id);
        Task<UserModel> InsertUser(UserModel user);
        Task<UserModel> UpdateUser(UserModel user);
        Task<UserModel> DeleteUser(int id);
        Task<UserModel> AuthenticateLogin(UserModel user);
        Task<bool> CheckUsernameExist(string user);
        Task<bool> CheckEmailExist(string user);
        string GetRefreshToken();


    }
}
