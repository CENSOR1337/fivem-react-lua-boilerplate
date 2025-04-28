local resource = GetCurrentResourceName()

RegisterCommand("openNui", function(src, args, rawCommand)
    TriggerClientEvent(("%s:openNui"):format(resource), src)
end, false)

Greetings()
