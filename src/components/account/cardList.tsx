const CardList = ({ children }: { children: React.ReactNode }) => {
    return (
        <ul className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 gap-5 mt-8">
            {children}
        </ul>
    );
};

export default CardList;
