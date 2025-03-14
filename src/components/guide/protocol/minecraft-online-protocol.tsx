import { CodeBlock } from "../CodeBlock";

export function MinecraftWebRTCProtocol() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Minecraft Online Protocol Based on WebRTC
        </h2>
      </div>

      <p className="mb-4">
        This article describes a launcher implementation for Minecraft that
        enables cross-local network play through WebRTC.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        What is WebRTC? Why choose it?
      </h3>

      <p className="mb-4">
        WebRTC is a peer-to-peer real-time communication technology. To quote
        from the{" "}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API"
          className="text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          MDN
        </a>
        :
      </p>

      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
        WebRTC (Web Real-Time Communications) is an open-source technology that
        enables real-time communication over peer-to-peer connections.
      </blockquote>

      <p className="mb-4">
        WebRTC was originally designed for real-time audio and video streaming
        between browsers, but this doesn't limit its use in a launcher.
      </p>

      <p className="mb-4">
        So why choose WebRTC over other technologies? The following table
        compares three ways of implementing online play:
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse border border-white/20">
          <thead>
            <tr className="bg-white/5">
              <th className="border border-white/20 p-2"></th>
              <th className="border border-white/20 p-2">WebRTC</th>
              <th className="border border-white/20 p-2">
                Handwritten Hole Punching (Custom Protocol)
              </th>
              <th className="border border-white/20 p-2">
                Hiper and other third-party software
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-white/20 p-2 font-medium">
                Customization
              </td>
              <td className="border border-white/20 p-2">High</td>
              <td className="border border-white/20 p-2">Highest</td>
              <td className="border border-white/20 p-2">-</td>
            </tr>
            <tr>
              <td className="border border-white/20 p-2 font-medium">
                Implementation Difficulty
              </td>
              <td className="border border-white/20 p-2">Low</td>
              <td className="border border-white/20 p-2">High</td>
              <td className="border border-white/20 p-2">Lowest</td>
            </tr>
            <tr>
              <td className="border border-white/20 p-2 font-medium">
                Ease of Use for Users
              </td>
              <td className="border border-white/20 p-2">
                Dependent on Implementation
              </td>
              <td className="border border-white/20 p-2">
                Dependent on Implementation
              </td>
              <td className="border border-white/20 p-2">
                Requires Admin Permissions, cost involved
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 className="text-xl font-semibold mt-6 mb-2">Customization</h4>
      <p className="mb-4">
        WebRTC and custom hole punching offer developers maximum control. With
        custom hole punching, the protocol is completely free of implementation
        restrictions since everything needs to be implemented from scratch.
      </p>
      <p className="mb-4">
        In contrast, unless SDKs are provided, extending other functions based
        on services like Hiper could be difficult.
      </p>
      <p className="mb-4">
        WebRTC only handles the connection establishment between users, while
        developers have complete control over what data to transfer, when to
        transfer it, and how to handle the data.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">
        Implementation Difficulty
      </h4>
      <p className="mb-4">
        Custom hole punching is the most difficult in terms of engineering
        difficulty. Since WebRTC and custom hole punching share similar
        principles, custom hole punching requires the developer to implement
        WebRTC functionality from scratch.
      </p>
      <p className="mb-4">
        In the process, developers may face a variety of bugs, and the scope
        that developers consider may not be as comprehensive as the WebRTC
        protocol developers.
      </p>
      <p className="mb-4">
        Using WebRTC is like standing on the shoulders of giants; developers
        don't need to deal directly with the various complex situations
        encountered when establishing connections, but simply use the interfaces
        encapsulated by WebRTC. Thus, the implementation difficulty of using
        WebRTC is much lower than completely handwriting custom hole punching.
      </p>
      <p className="mb-4">
        There's basically no significant engineering difficulty for third-party
        services like Hiper.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">Ease for Users</h4>
      <p className="mb-4">
        It's worth noting that using third-party services requires users to
        connect to their external systems, which may involve additional costs.
      </p>
      <p className="mb-4">
        If developers use custom hole punching or WebRTC, they can fully control
        the user experience aspect.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Protocol Details and Basic Concepts
      </h3>
      <p className="mb-4">
        The protocol consists primarily of the following parts:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>How to establish a peer-to-peer connection between users.</li>
        <li>
          The protocol format for communication between users after a
          peer-to-peer connection has been established.
        </li>
        <li>How to allow Minecraft to connect through a DataChannel.</li>
      </ul>

      <p className="mb-4">
        Here's a brief introduction to the concepts that appear in WebRTC and
        what they represent:
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">PeerConnection</h4>
      <p className="mb-4">
        PeerConnection represents the connection established with other users.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">DataChannel</h4>
      <p className="mb-4">
        DataChannel represents the data communication channel established with
        other users in a PeerConnection, similar to a Socket. A PeerConnection
        can have many DataChannels used for different types of communication.
        DataChannels can be created/closed arbitrarily after a PeerConnection
        has been successfully established.
      </p>
      <p className="mb-4">
        When creating a DataChannel, the{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">protocol</span>{" "}
        (protocol) can be specified. The remote listener can handle different
        DataChannel creations based on{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">protocol</span>.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
      <p className="mb-4">
        The Description is a string created by PeerConnection to describe the
        local network information. This string contains some information
        required for hole punching (since WebRTC fundamentally still requires
        hole punching).
      </p>
      <p className="mb-4">
        Developers need not fully understand the contents of this string; they
        simply need to transmit it correctly to the other side via the signaling
        server.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">ICEServer</h4>
      <p className="mb-4">
        ICEServer is divided into two types: STUN and TURN.
      </p>
      <p className="mb-4">
        WebRTC needs to obtain local network information from an STUN server in
        order to punch holes.
      </p>
      <p className="mb-4">
        Many STUN servers are free, such as{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">
          stun:stun.qq.com
        </span>{" "}
        used by QQ.
      </p>
      <p className="mb-4">
        A TURN server is responsible for relaying traffic. It is usually
        self-deployed and requires payment.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        How to establish connections between users
      </h3>
      <p className="mb-4">
        In WebRTC, connections between users are established through the
        exchange of Description strings.
      </p>
      <p className="mb-4">
        For example, if A and B need to establish a connection, A as the
        initiating party needs to:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Create a new WebRTC PeerConnection</li>
        <li>
          Listen for local Description changes and send them to B through a
          coordination server
        </li>
        <li>
          Establish a data channel with{" "}
          <span className="bg-blue-900/50 px-1 py-0.5 rounded">protocol</span>{" "}
          set to{" "}
          <span className="bg-blue-900/50 px-1 py-0.5 rounded">metadata</span>{" "}
          for regular communication
        </li>
        <li>Wait for B's Description</li>
      </ul>

      <p className="mb-4">Here is a pseudo-code example:</p>

      <CodeBlock language="typescript">
        {`// "id" here represents the ID of the person you want to connect to, which can be generated arbitrarily as long as it is unique
function initiateConnection(id: string) {
    // create a new connection
    let connection = new PeerConnection(id, {
        iceServers: [
            // You can use your own STUN/TURN servers to help establish a connection
            // But having too many servers is not recommended - usually 1-2 is enough
            "stun:stun.qq.com",
        ]
        iceTransportPolicy: 'all',
    });

    // Some WebRTC implementations will automatically generate a local Description after creating a data channel
    // If so, you only need to listen for local Description changes
    connection.onLocalDescription((description) => {
        // Send your Description to the other person through the coordination server
        sendDescription(id, description);
    });

    // As the initiator, you need to actively create the data channel
    const channel = connection.createDataChannel(id, {
        ordered: true, // order means that this channel is reliable
        protocol: 'metadata'
    })

    // Communicate with the remote endpoint through the channel in the future
}`}
      </CodeBlock>

      <p className="mb-4">
        Some WebRTC implementations do not create a local Description
        automatically, in which case you must create an Offer and send it to the
        other person:
      </p>

      <CodeBlock language="typescript">
        {`    const offer = await connection.createOffer()
    sendDescription(id, offer);`}
      </CodeBlock>

      <p className="mb-4">
        B as the recipient of the connection needs to create a PeerConnection
        after receiving A's Description. The process is similar to the above,
        and here is the pseudo-code:
      </p>

      <CodeBlock language="typescript">
        {`function onGetOtherDescription(id: string, description: Description) {
    let connection = new PeerConnection(id, {
        iceServers,
        iceTransportPolicy: 'all',
    });

    // Set the remote Description directly
    connection.setRemoteDescription(description);

    // Listen for data channel creation
    connection.onDataChannel((channel) => {
        if (channel.protocol === 'metadata') {
            // This is the metadata channel
        }
        // You can also handle data channels of many other protocols here
    });

    // Like the initiator, when a local Description is available, send it to the other person
    connection.onLocalDescription((description) => {
        // Send your Description to the other person through the coordination server
        sendDescription(id, description);
    });
}`}
      </CodeBlock>

      <p className="mb-4">
        Some WebRTC implementations do not create a local Description
        automatically, in which case you must create an Answer and send it to
        the other person:
      </p>

      <CodeBlock language="typescript">
        {`    const answer = await connection.createAnswer()
    sendDescription(id, answer);`}
      </CodeBlock>

      <p className="mb-4">
        When the metadata data channel between both parties is successfully
        established, the connection is also established (hole-punching
        successful!). However, you can use the{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">
          ConnectionState
        </span>{" "}
        changes on the PeerConnection to determine the connection status.
      </p>

      <p className="mb-4">
        Most WebRTC implementations have the following ConnectionState:
      </p>

      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>"closed" - The connection is closed.</li>
        <li>"connected" - The connection is established.</li>
        <li>"connecting" - The connection is being established.</li>
        <li>"disconnected" - The connection is disconnected.</li>
        <li>"failed" - The connection failed.</li>
        <li>"new" - The connection was just created.</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Protocol Format for Communication between Users
      </h3>
      <p className="mb-4">
        After establishing a PeerConnection, users need to communicate through a
        DataChannel with{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">protocol</span> as
        the <span className="bg-blue-900/50 px-1 py-0.5 rounded">metadata</span>
        .
      </p>
      <p className="mb-4">
        The format of communication information is a UTF-8 JSON string. The JSON
        format of the message (hereinafter referred to as Message) is:
      </p>

      <CodeBlock language="typescript">
        {`interface Message {
    type: string
    payload: object
}`}
      </CodeBlock>

      <p className="mb-4">
        Where <span className="bg-blue-900/50 px-1 py-0.5 rounded">type</span>{" "}
        represents different types of messages and{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">type</span>{" "}
        determines the format of the payload.
      </p>

      <p className="mb-4">
        The following pseudo-code shows how to send a message to the other party
        through the channel with{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">protocol</span> as
        the metadata:
      </p>

      <CodeBlock language="typescript">
        {`send<T>(type: string, payload: object) {
    // Convert message to JSON string
    const messageString = JSON.stringify({
        type: type,
        payload: payload
    })
    // Send the string via the metadata channel
    this.channel.sendMessage(messageString)
}`}
      </CodeBlock>

      <h4 className="text-xl font-semibold mt-6 mb-2">Heartbeat Message</h4>
      <p className="mb-4">
        The heartbeat message is divided into two types: Ping and Pong.
      </p>
      <p className="mb-4">
        The heartbeat Ping message is sent to the other party every second after
        the connection is established. The heartbeat message carries a timestamp
        that can be used to calculate the delay between you and the other party.
      </p>
      <p className="mb-4">
        The type of Ping message is{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">
          heartbeat-ping
        </span>
        , and its payload contains only one property,{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">time</span>. An
        example is as follows:
      </p>

      <CodeBlock language="json">
        {`{
    "type": "heartbeat-ping",
    "payload": {
        "time": 12391724789
    }
}`}
      </CodeBlock>

      <p className="mb-4">
        After receiving a Ping message, you need to send a Pong message back to
        the other party. The format of Pong is the same as that of Ping message,
        except that the{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">type</span> is{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">
          heartbeat-pong
        </span>
        . The <span className="bg-blue-900/50 px-1 py-0.5 rounded">time</span>{" "}
        of Pong should be the same as that of Ping.
      </p>

      <CodeBlock language="json">
        {`{
    "type": "heartbeat-pong",
    "payload": {
        "time": 12391724789
    }
}`}
      </CodeBlock>

      <h4 className="text-xl font-semibold mt-6 mb-2">
        Player Identity Message
      </h4>
      <p className="mb-4">
        The player identity message is used to update the launcher to display
        the player's avatar, name, and so on. The{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">payload</span>{" "}
        should be similar to the Minecraft user's GameProfile.
      </p>
      <p className="mb-4">
        Among them,{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">textures</span>{" "}
        stores the player's skin information, which makes it easy to use
        authlib-injector to share everyone's skins.
      </p>

      <CodeBlock language="json">
        {`{
    "type": "identity",
    "payload": {
        "name": "username",
        "id": "user uuid",
        "textures": {
            "SKIN": {
                "url": "skin url",
                "metadata": { "model": "slim" }
            }
        }
    }
}`}
      </CodeBlock>

      <h4 className="text-xl font-semibold mt-6 mb-2">
        Minecraft LAN Discovery Message
      </h4>
      <p className="mb-4">
        When a message is received that a Minecraft game on the LAN has
        published its world, you should send this message to other users via the
        metadata DataChannel.
      </p>
      <p className="mb-4">
        After receiving this message, other users should create a proxy server
        locally and wait for the local Minecraft to connect.
      </p>
      <p className="mb-4">The following is the format of the message:</p>

      <CodeBlock language="json">
        {`{
    "type": "lan",
    "payload": {
        "motd": "your server's motd",
        "port": 34631
    }
}`}
      </CodeBlock>

      <p className="mb-4">
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">motd</span> is a
        brief description of the server, and{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">port</span> is the
        port number of the Minecraft open to the LAN.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        How to use DataChannel to play Minecraft multiplayer
      </h3>
      <p className="mb-4">
        We need to create a DataChannel protocol named{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">minecraft</span> to
        transmit all traffic from Minecraft.
      </p>
      <p className="mb-4">
        After receiving the LAN game message from other users in Minecraft, the
        launcher needs to create a local proxy server and send the port of the
        proxy server to the local Minecraft as a fake LAN server.
      </p>
      <p className="mb-4">
        The following pseudo-code demonstrates the process:
      </p>

      <CodeBlock language="typescript">
        {`function createMinecraftProxyServer(motd: string, port: number) {
    // Create a proxy server
    const server = createServer((socket) => {
        // This socket is the socket when the Minecraft game connects to your local proxy server.

        // This DataChannel needs to use the expected port as the label.
        const gameChannel = this.connection.createDataChannel(port, {
            protocol: 'minecraft', // You need to specify the protocol as minecraft.
            order: true, // order represents reliability.
        })

        // Listen to data from Minecraft and send it directly to the other party through DataChannel
        socket.on('data', (buf) => gameChannel.sendMessageBinary(buf))
        // Listen to data from the other party and feed it directly to Minecraft
        gameChannel.onMessage((data) => socket.write(Buffer.from(data)))

        // When one party closes, close the other party as well
        socket.on('close', () => gameChannel.close())
        gameChannel.onClosed(() => socket.destroy())
    })

    // You need to try to make the server listen to the port that needs to be listened to
    // The actual proxy server port may be different from the expected port.
    const port = tryListenTo(server, info.port)

    // Send the real proxy server port and MOTD pretending to be Minecraft open to the LAN information to local Minecraft
    broadcastLanMessageToMinecraft(info.motd, port)
}`}
      </CodeBlock>

      <p className="mb-4">
        It is important to note that the locally created server port may be
        different from the port sent from the remote end, and the launcher needs
        to maintain this port mapping itself.
      </p>
      <p className="mb-4">
        After the proxy TCP server is started, the launcher needs to
        periodically broadcast this MOTD and port in order for Minecraft to
        refresh the game in the LAN game list.
      </p>
      <p className="mb-4">
        For the sharing party of Minecraft in the LAN game, they need to listen
        to the creation of the DataChannel whose protocol is{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">minecraft</span>.
        The following pseudo-code shows how to establish a connection after
        listening.
      </p>

      <CodeBlock language="typescript">
        {`// When a new DataChannel is created
this.connection.onDataChannel((channel) => {
    // When the DataChannel is minecraft
    if (channel.protocol === 'minecraft') {
        // Get the port by label of the channel
        const port = Number.parseInt(channel.label)!

        // Establish a TCP connection to the corresponding port number on the local machine.
        // This is equivalent to connecting to the Minecraft LAN server opened on the local machine.
        const socket = createConnection(port)

        // Listen to the data from this Minecraft connection and send it directly to the remote party.
        socket.on('data', (buf) => channel.sendMessageBinary(buf))
        // Listen to data from the remote end and forward it directly to Minecraft.
        channel.onMessage((data) => socket.write(Buffer.from(data)))

        // When one party closes, close the other party as well
        socket.on('close', () => channel.close())
        channel.onClosed(() => socket.destroy())
    } else if (channel.protocol === 'metadata') {
        // As metadata channel handling
    } else {
        // Other protocols...
    }
})`}
      </CodeBlock>

      <p className="mb-4">
        After the{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">minecraft</span>{" "}
        DataChannel is established, one party has entered the other party's
        game!
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4">Appendix</h3>

      <h4 className="text-xl font-semibold mt-6 mb-2">
        Broadcasting Minecraft LAN information
      </h4>
      <p className="mb-4">
        Minecraft LAN searches are implemented through UDP multicast, so the
        launcher only needs to send a string in the format of
      </p>

      <CodeBlock language="javascript">
        {"[MOTD]${motd}[/MOTD][AD]${port}[/AD]"}
      </CodeBlock>

      <p className="mb-4">
        to the address{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">
          224.0.2.60:4445
        </span>{" "}
        designated by Minecraft, where{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">motd</span> is the
        description of the server and{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">port</span> is the
        port of the proxy server.
      </p>
      <p className="mb-4">
        For example, if the proxy server is listening to port 28378 on your
        machine, you need to send the following string:
      </p>

      <CodeBlock language="javascript">
        {"[MOTD]${motd}[/MOTD][AD]${port}[/AD]"}
      </CodeBlock>

      <p className="mb-4">Listening to this UDP packet is similar.</p>

      <h4 className="text-xl font-semibold mt-6 mb-2">Relay</h4>
      <p className="mb-4">
        Since we are using WebRTC, the relay server is a standard TURN server.
      </p>
      <p className="mb-4">
        A mature server like{" "}
        <a
          href="https://github.com/coturn/coturn"
          className="text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Coturn
        </a>{" "}
        can be used as a relay server.
      </p>
      <p className="mb-4">Each launcher can set up its own relay service.</p>
      <p className="mb-4">
        In the launcher, only the{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">iceServers</span>{" "}
        of PeerConnection need to be configured
      </p>
      <p className="mb-4">For example:</p>

      <CodeBlock language="typescript">
        {`let connection = new PeerConnection(id, {
    iceServers: [
        {
            urls: 'turn:my-turn-server.mycompany.com:19403',
            username: 'Your TURN server username',
            credentials: 'Login token'
        }
    ], // This is
    iceTransportPolicy: 'all',
});`}
      </CodeBlock>

      <p className="mb-4">
        Note that credentials with user accounts and login tokens can be added
        (because relays are expensive), and the launcher can implement user
        authentication for relays based on its own account system.
      </p>
      <p className="mb-4">
        Therefore, the value of this{" "}
        <span className="bg-blue-900/50 px-1 py-0.5 rounded">iceServers</span>{" "}
        parameter may need to be dynamically determined based on user behavior.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">Coordination server</h4>
      <p className="mb-4">
        This article does not limit the implementation of coordination servers.
      </p>
      <p className="mb-4">
        The coordination server needs to exchange Description between users to
        ensure that PeerConnection can establish connections. The lobby server
        of the launcher is basically the job of this coordination server.
      </p>
      <p className="mb-4">
        Common WebSockets can be used for implementation, or Sockets can be
        implemented as well. Users can also manually copy and send Description
        to each other.
      </p>
      <p className="mb-4">This aspect is not discussed in this article.</p>

      <h4 className="text-xl font-semibold mt-6 mb-2">
        Transmission reliability
      </h4>
      <p className="mb-4">
        A common concern is whether WebRTC data transmission is reliable,
        because Minecraft multiplayer games use the TCP protocol, and packet
        loss will not be handled correctly by Minecraft.
      </p>
      <p className="mb-4">
        But in fact, WebRTC supports reliable transmission and can be set when
        DataChannel is created. See{" "}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel"
          className="text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          MDN documentation on{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel/ordered"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            ordered transmission
          </a>
        </a>
        .
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">IPV6?</h4>
      <p className="mb-4">WebRTC supports IPV6.</p>

      <h4 className="text-xl font-semibold mt-6 mb-2">Upnp?</h4>
      <p className="mb-4">Some WebRTC implementations support Upnp.</p>
      <p className="mb-4">
        A simple method is to specify a port range for WebRTC, and put the
        mapped ports in the front of the range.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">WebRTC Libraries</h4>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>
          <a
            href="https://github.com/microsoft/winrtc"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            WebRTC for .NET C#
          </a>
        </li>
        <li>
          <a
            href="https://github.com/devopvoid/webrtc-java"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            WebRTC binding for Java
          </a>
        </li>
        <li>
          <a
            href="https://github.com/murat-dogan/node-datachannel"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            WebRTC binding for NodeJS
          </a>
        </li>
        <li>
          <a
            href="https://github.com/paullouisageneau/libdatachannel"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            WebRTC implementation in C
          </a>
        </li>
        <li>
          <a
            href="https://github.com/lerouxrgd/datachannel-rs"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            WebRTC implementation in Rust
          </a>
        </li>
        <li>
          <a
            href="https://github.com/pion/webrtc"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            WebRTC implementation in Go
          </a>
        </li>
      </ul>
    </div>
  );
}
