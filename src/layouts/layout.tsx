const Layout : React.FC<any> = ({children}) => {
    return (
        <div  className="w-full flex flex-col items-center">
            <section className="w-[65%] pl-[16px]">
                {children}
            </section>
        </div>
    )
}

export default Layout