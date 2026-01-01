const HeroBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-trolley-pink/10 to-trolley-orange/10 rounded-2xl p-6 lg:p-8 mb-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
            Introducing Pets at Home & Nectar Prices 👋
          </h2>
          <p className="text-muted-foreground text-sm lg:text-base">
            The home of grocery comparison just got bigger and better - with exclusive discount codes to help you start saving now!
          </p>
        </div>
        <div className="flex-shrink-0">
          <img
            src="https://trolley.co.uk/imgs/pets-nectar-hero.png"
            alt="Pets at Home and Nectar Prices"
            className="h-24 lg:h-32 object-contain"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=200&h=100&fit=crop";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
