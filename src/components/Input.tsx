
export const Input = ({className, ...rest}: React.ComponentPropsWithoutRef<"input">) => {
    return <input className={className || "border-2 border-gray-200 p-1 rounded"} {...rest}/>
}