namespace Domain
{
    public class Cabinet
    {
        public int Id { get; set; }
        public int RegistrationCode { get; set; }
        public string Name { get; set; }
        public Contact CabinetContact { get; set; }
    }
}