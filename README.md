Mainly an `enigma` to `secret` bech32 addresses converter.

## Website

https://bech32.enigma.co

## CLI

You can get it from here: https://github.com/enigmampc/bech32.enigma.co/releases/cli

### Options

```console
$ ./bech32-convert -h
Usage of ./bech32-convert:
  -from string
        from prefix (default "enigma")
  -to string
        to prefix (default "secret")
```

### Usage

```console
$ cat new_genesis.json | ./bech32-convert > ~/.scrtd/config/genesis.json
```
