using Domain.Interface;
using Domain.Model;
using Domain.Model.TokenAPIDto;
using LoginAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.WebSockets;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace LoginAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        
        public UserController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            try
            {
                var result = await _userRepo.GetAllUsers();
                return Ok(result);   
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("id")]
        public async Task<IActionResult> GetOneUser(int id)
        {
            try
            {
                var result = await _userRepo.GetOneUserByID(id);
                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsertUser(UserModel user)
        {

            try
            {
                if (user == null)
                {
                    return BadRequest();
                }
                var checkUsername = await _userRepo.CheckUsernameExist(user.Username);
                //check same username
                if (checkUsername)
                {
                    return BadRequest(new { Message = "Username Already Exists!" });
                }
                //check same email
                if (await _userRepo.CheckEmailExist(user.EmailAddress))
                {
                    return BadRequest(new { Message = "Email Address Already Exists" });
                }
                var result = await _userRepo.InsertUser(user);
                return Ok(new {Message = "User Added!"});

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

            //user.Password = PasswordHash.HashPassword(user.Password);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser(UserModel user)
        {
            try
            {
                var result = await _userRepo.UpdateUser(user);
                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var result = await _userRepo.DeleteUser(id);
                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(UserModel user)
        {
        

            if (user == null)
            {
                return BadRequest();
            }
            var result = await _userRepo.AuthenticateLogin(user);
            if (result == null)
            {
                return NotFound(new { Message = "User not found" });
            }
            result.Token = CreateJWTToken(result);

            return Ok(new
            {
                Token = result.Token,
                Message = "Login Successful"
            });
        }

        private string CreateJWTToken(UserModel user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("secret45353454354jdfg");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.EmailAddress),
                new Claim(ClaimTypes.Role, user.Role),
            });

            var creditials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(120),
                SigningCredentials = creditials,
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

    


    }
}
