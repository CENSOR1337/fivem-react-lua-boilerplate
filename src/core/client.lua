local resource = GetCurrentResourceName()

RegisterNetEvent(("%s:openNui"):format(resource), function()
    SetNuiFocus(true, true)

    SendNUIMessage({
        action = 'setVisible',
        data = {
            visible = true,
        },
    })
end)

RegisterNuiCallback("exit", function(data, cb)
    SetNuiFocus(false, false)
    cb({})
end)

Greetings()
