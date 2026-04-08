# Facade Pattern

Provide a single simplified entry point in front of a complex subsystem. The client only sees the facade — it doesn't need to know which classes exist inside, what order to call them, or how they coordinate.

## Core Roles

| Role | Description |
|------|-------------|
| **Facade** | The single class that exposes a simplified API |
| **Subsystem** | The collection of classes the facade hides |

## Why Bother? Isn't This Just Wrapping a Function?

Code-wise, Facade looks identical to "extract this 5-step call into one method." The difference isn't technique — it's **architectural intent**.

A normal helper function exists to remove duplicate code. A facade defines a **subsystem boundary**: it declares "this is the only way clients should access this subsystem." The internals can change freely — clients are insulated.

If you've ever written a backend `Service` layer (Controller → Service → DAO), that Service class **is** a facade.

## Example 1: Video Transcoder

A transcode operation requires reading the file, extracting audio, picking a codec, encoding, mixing, and writing the output. Six classes, fixed call order.

### Subsystem classes

```js
class VideoFileReader {
  read(path) {
    console.log(`Read video file: ${path}`);
    return new Uint8Array([1, 2, 3]);
  }
}

class AudioExtractor {
  extract(videoData) {
    console.log('Extract audio track');
    return new Uint8Array([4, 5]);
  }
}

class CodecFactory {
  getCodec(format) {
    console.log(`Get ${format} codec`);
    return `${format}-codec`;
  }
}

class VideoEncoder {
  encode(videoData, codec) {
    console.log(`Encode video with ${codec}`);
    return new Uint8Array([6, 7, 8]);
  }
}

class AudioMixer {
  mix(videoData, audioData) {
    console.log('Mix audio and video');
    return new Uint8Array([9, 10, 11]);
  }
}

class FileWriter {
  write(path, data) {
    console.log(`Write file: ${path}`);
  }
}
```

### Facade

```js
class VideoConverter {
  constructor() {
    this.reader = new VideoFileReader();
    this.audioExtractor = new AudioExtractor();
    this.codecFactory = new CodecFactory();
    this.encoder = new VideoEncoder();
    this.mixer = new AudioMixer();
    this.writer = new FileWriter();
  }

  // Single simple method that hides the whole pipeline
  convert(inputPath, outputPath, targetFormat) {
    const videoData = this.reader.read(inputPath);
    const audioData = this.audioExtractor.extract(videoData);
    const codec = this.codecFactory.getCodec(targetFormat);
    const encoded = this.encoder.encode(videoData, codec);
    const final = this.mixer.mix(encoded, audioData);
    this.writer.write(outputPath, final);
  }
}
```

### Usage

```js
const converter = new VideoConverter();
converter.convert('input.avi', 'output.mp4', 'mp4');
```

The client doesn't know there are 6 subsystem classes, doesn't know the order, doesn't import anything else. If the pipeline gains a "watermark" step or swaps the encoder, the client code is untouched.

## Example 2: Payment SDK

A more interesting case: an SDK exposed to other teams, where the facade defines the **public contract**.

```js
class RiskControlService {
  check(userId, amount) {
    console.log(`Risk check: user ${userId}, amount ${amount}`);
    return amount < 50000;
  }
}

class AccountService {
  getBalance(userId) {
    console.log(`Query balance: user ${userId}`);
    return 10000;
  }
  debit(userId, amount) { console.log(`Debit ${amount} from ${userId}`); }
  credit(userId, amount) { console.log(`Credit ${amount} to ${userId}`); }
}

class PaymentGateway {
  charge(channel, amount) {
    console.log(`Charge ${amount} via ${channel}`);
    return `PAY-${Date.now()}`;
  }
  refund(transactionId) {
    console.log(`Refund: ${transactionId}`);
  }
}

class NotificationService {
  sendSms(phone, message) {
    console.log(`SMS to ${phone}: ${message}`);
  }
}
```

### Facade

```js
class PaymentService {
  constructor() {
    this.risk = new RiskControlService();
    this.account = new AccountService();
    this.gateway = new PaymentGateway();
    this.notification = new NotificationService();
  }

  pay(userId, channel, amount, phone) {
    if (!this.risk.check(userId, amount)) {
      throw new Error('Risk check failed');
    }
    if (this.account.getBalance(userId) < amount) {
      throw new Error('Insufficient balance');
    }
    const txId = this.gateway.charge(channel, amount);
    this.account.debit(userId, amount);
    this.notification.sendSms(phone, `Payment success: ${amount}`);
    return txId;
  }

  refund(userId, txId, amount, phone) {
    this.gateway.refund(txId);
    this.account.credit(userId, amount);
    this.notification.sendSms(phone, `Refund success: ${amount}`);
  }
}
```

```js
const payment = new PaymentService();
const txId = payment.pay('user_001', 'alipay', 99.9, '13800138000');
payment.refund('user_001', txId, 99.9, '13800138000');
```

The SDK consumer only depends on `PaymentService`. Risk rules change, payment channel swaps, notification adds an email — none of it leaks out.

## Facade vs Adapter

| | Facade | Adapter |
|---|---|---|
| **Purpose** | Simplify a complex subsystem | Convert one interface to another |
| **Existing interface** | Not the issue — too many of them | Issue is incompatibility |
| **Output** | A new, smaller API | A wrapper matching the expected interface |

Adapter = "convert interface". Facade = "simplify interface".

## Trade-offs

- **Pro**: Decouples client from subsystem internals — safe to refactor inside
- **Pro**: Defines explicit subsystem boundaries (architectural value)
- **Con**: Can grow into a god class if methods accumulate without discipline
- **Con**: Adding subsystem features usually requires updating the facade

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/facade/
