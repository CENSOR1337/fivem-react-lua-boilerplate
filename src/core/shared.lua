local resource = GetCurrentResourceName()
local is_server = IsDuplicityVersion()

function Greetings()
    print(("started and loaded %s"):format(resource))
    print(("Hello from %s"):format(is_server and "server" or "client"))
end
