namespace Domain
{
    public class DogOwner
    {
        public int Id {get; set;}
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Medic OwnerMedic { get; set; }
        public Contact OwnerContact { get; set; }
    }
    
}