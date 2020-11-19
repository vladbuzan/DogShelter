namespace Domain
{
    public class Dog
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DogOwner Owner { get; set; }

    }
}