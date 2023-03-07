import { P2PProvider, ProtocolRequestHandlerResponse, StreamDirection, VersionHandlerEventType } from "@frontend/p2p"

const createElement = (element, content, elementModifier = undefined, parentElement = undefined) => {
    const createdElement = document.createElement(element);

    if (elementModifier) {
        elementModifier(createdElement);
    }
    
    if (content) {
        createdElement.innerHTML = content;
    }

    (parentElement ?? window.document.body).appendChild(createdElement);

    return createdElement;
}

const errorToString = (error) => {
    if (error.stack) {
        return `${error.toString()} \n\n ${error.stack.toString()}`;
    }

    return error.toString();
}


let parentLogElement = undefined;
const ensureParentLogElement = () => {
    parentLogElement ||= createElement('div', '', (modifier) => {
        modifier.style.width = "100%";
        modifier.style.display = "flex";
        modifier.style.flexDirection = "column";
    });

    return parentLogElement;
}

const showError = (error) => {

    createElement('code', errorToString(error), (element) => {
        element.style.display = "block";
        element.style.width = "100%";
        element.style.color = 'white';
        element.style.borderRadius = '10px';
        element.style.backgroundColor = 'red';
        element.style.whiteSpace = "pre";
        element.style.borderBottom = "1px solid black";
    }, ensureParentLogElement());

    console.trace();
    console.error("error: ", error);
}

const showMessage = (message) => {
    createElement('code', message, (element) => {
        element.style.display = "block";
        element.style.width = "100%";
        element.style.borderRadius = '10px';
        element.style.whiteSpace = "pre";
        element.style.backgroundColor = 'grey';
        element.style.color = "black";
        element.style.borderBottom = "1px solid black";
    })
}


(async () => {

    showMessage("Initializing modules...");

    // Host side
    // Create a group factory for the "echo" protocol.
    const myGroupFactory = await P2PProvider.createGroupFactory({ value: "echo" })
    // Create a version handler, that will handle version 1.0.0 of the echo protocol.
    const versionHandler = myGroupFactory.generateVersionHandler('1.0.0', (versionHandler) => {
        // Create a listener on all events.
        // This is a binary mask, so you can define the events however you want, by just registering one handler.
        versionHandler.on(VersionHandlerEventType.all, async (event, content) => {

            // Only allow inbound connections.
            if (content.stream.getStreamDirection() === StreamDirection.Outbound) {
                // Close the connection, when it is going out.
                return ProtocolRequestHandlerResponse.Close;
            }

            // Handle different events.
            switch(event.type) {
                // We got a new connection
                case VersionHandlerEventType.ready:
                    return ProtocolRequestHandlerResponse.StayOpen;

                // We received some data.
                case VersionHandlerEventType.data:
                    // Send the same data back, close connection afterwards.
                    await content.stream.send(content.stream.getContent());
                case VersionHandlerEventType.error:
                    // TODO: Handle your error here.
                    // Our example implementation will just close the connection.
                default:
                    return ProtocolRequestHandlerResponse.Close;
            }
        }, P2PProvider.packageSeparator.Delimiter("\n")) // Call data event on "\n" in packets (Split them up or join them so that they end with "\n")
    })

    showMessage("Generating group...");
    // Generate a real group out of the provided data.
    const myGroup = await myGroupFactory.generate();

    // Create a connection handler (It is used to really handle the connections), provide the groups to it. 
    showMessage("Creating connection handler...");
    const connectionHandler = await P2PProvider.createConnectionHandler({ groups: [myGroup] });
    
    // Start connecting, when addresses are provided & start handling connections all together.
    showMessage("Starting connection handler...");
    await connectionHandler.start();
    
    // On new connection or other events? // TODO: Define.
    //connectionHandler.on('connection', () => {
    //});

    // Create some elements using some helpers, these will be used to:
    // - input: contains the target address.
    const input = createElement('input', undefined, (content) => content.type = "text");
    // - button: register click event for the execute function.
    const button = createElement('button', 'Connect client & send "hello world"', (content) => content.type = "button");

    /**
     * The execute function will try to connect to the value provided by the input, create a stream using the echo protocol, and send a hello-world packet(s)
     */
    const execute = async () => {
        showMessage(`Trying to connect to "${input.value}"`);
        // Connect to client.
        const connection = await connectionHandler.dial(input.value);

        // Create the stream.
        const stream = await connectionHandler.getStreamForProtocol(input.value, { group: myGroup, version: versionHandler }); // Can throw exception, when group(protocol) or version are not found.
        // Handle data event.
        stream.on(VersionHandlerEventType.data, (event, content) => {
            try {
                // Transform the binary representation(UInt8Array) to string and display it + address.
                showMessage(`Got response from "{${content.source.address}}" value: "${P2PProvider.transformer.string.from(content.stream)}"`);
                connection.close();
            } catch (error) {
                showError(error);
            }
        });
        
        // Peer discorvery events & others? // TODO: Define.
        //connection.on('event', () => {
        //});
        // Tranform string to binary representation(UInt8Array) and send it.
        await stream.send(P2PProvider.transformer.string.to("hello-world\n"));
    }


    button.addEventListener('click', async () => {
        try {
            await execute();
        } catch (error) {
            showError(error);
        }
    });
})().catch(showError);
