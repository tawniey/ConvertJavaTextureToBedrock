import AbstractConverter from "./AbstractConverter";
import Utils from "../Utils/Utils";

/**
 * Class Particles1_13Converter
 */
class Particles1_13Converter extends AbstractConverter {
	/**
	 * @inheritDoc
	 */
	async convert() {
		for await (const [from, to] of this.getData()) {
			if (await this.output.exists(from)) {
				Utils.log(`Convert particles ${from}`);

				const image = await this.readImage(from);

				image.crop(0, 0, (image.getWidth() / 2), (image.getHeight() / 2)); // Bedrock only uses the first 25% of the image (Rest is transparent on Java)

				await this.writeImage(to, image);
			}
		}

		return [];
	}

	/**
	 * @inheritDoc
	 */
	async* getData() {
		const data = [
			["textures/particle/particles.png", "textures/particle/particles.png"]
		];

		for (const date of data) {
			yield date;
		}
	}
}

export default Particles1_13Converter;
